import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Container, CircularProgress } from '@material-ui/core'
import Land from '../abis/LandRegistry.json'
import ipfs from '../ipfs'
import Table from '../Containers/Govt_Table'
import { withStyles } from '@material-ui/core/styles'
import Web3 from 'web3'
import jwtDecode from 'jwt-decode'

const styles = (theme) => ({
  container: {
    // paddingLedt: '0px',
    // paddingRight: '0px',
    '& .MuiContainer-maxWidthLg': {
      maxWidth: '100%',
    },
  },
})

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assetList: [],
      isLoading: true,
      username: '',
      Governmentpublickey: '',
      address: '',
      contact: '',
      city: '',
      imgurl: '',
    }
  }

  componentWillMount = async () => {
    // console.log('token= ' + window.localStorage.getItem('token'))
    const user = jwtDecode(window.localStorage.getItem('token'))
    this.setState({ ...user.user })
    // this.setState({ ...user.user })
    const web3 = window.web3
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts()
    window.localStorage.setItem('web3account', accounts[0])
    this.setState({ isLoading: false })
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }
    this.getDetails()
  }

  async propertyDetails(property) {
    // console.log(property)
    let details = await this.state.landList.methods
      .landInfoOwner(property)
      .call()
    ipfs.cat(details[1], (err, res) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(details)
      const temp = JSON.parse(res.toString())
      this.state.assetList.push({
        property: property,
        uniqueID: details[1],
        name: temp.name,
        key: details[0],
        email: temp.email,
        contact: temp.contact,
        pan: temp.pan,
        occupation: temp.occupation,
        oaddress: temp.address,
        ostate: temp.state,
        ocity: temp.city,
        opostalCode: temp.postalCode,
        laddress: temp.laddress,
        lstate: temp.lstate,
        lcity: temp.lcity,
        lpostalCode: temp.lpostalCode,
        larea: temp.larea,
        lamount: details[2],
        isGovtApproved: details[3],
        isAvailable: details[4],
        requester: details[5],
        requestStatus: details[6],
        document: temp.document,
        images: temp.images,
      })
      this.setState({ assetList: [...this.state.assetList] })
    })
  }

  async getDetails() {
    const properties = await this.state.landList.methods.Assets().call()
    // console.log(properties)

    for (let item of properties) {
      console.log('item:' + item)
      this.propertyDetails(item)
    }
  }
  render() {
    const { classes } = this.props
    return this.state.isLoading ? (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress />
      </div>
    ) : (
      <div className="profile-bg">
        <div className={classes.container}>
          <Container style={{ marginTop: '40px' }}>
            {/* <Button
            style={{ marginTop: '30px' }}
            variant="contained"
            color="primary"
            onClick={() => this.props.history.push('/registration_form')}
          >
            Register Land
          </Button> */}
            <div style={{ marginTop: '100px' }}>
              <Table assetList={this.state.assetList} />
            </div>
          </Container>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Dashboard)
