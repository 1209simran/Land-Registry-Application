import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Land from '../abis/LandRegistry.json'
import Grid from '@material-ui/core/Grid'
import { Card } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const columns = [
  { id: 'property', label: 'Property ID', minWidth: 100 },
  { id: 'name', label: 'Full Name', minWidth: 100 },

  {
    id: 'laddress',
    label: 'Land Details',
    minWidth: 170,
  },

  {
    id: 'lstate',
    label: 'State',
    minWidth: 100,
  },
  {
    id: 'lcity',
    label: 'City',
    minWidth: 100,
  },

  {
    id: 'lamount',
    label: 'Total Amount (in Rs)',
    minWidth: 100,
  },
  {
    id: 'document',
    label: 'Documents',
    minWidth: 100,
  },
  {
    id: 'images',
    label: 'Land Images',
    minWidth: 100,
  },
  {
    id: 'isGovtApproved',
    label: 'Status of Land Approval (by the Govt.)',
    minWidth: 100,
  },
  {
    id: 'isAvailable',
    label: 'Land Availability Status',
    minWidth: 100,
  },
  {
    id: 'requester',
    label: 'Requestor Info',
    minWidth: 100,
  },
]

const styles = (theme) => ({
  root: {
    width: '100%',
  },
})

class table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assetList: [],
      isLoading: true,
      open: false,
      open1: false,
      images: [],
    }
  }
  componentDidMount = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    await window.localStorage.setItem('web3account', accounts[0])
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }
  }

  handleAccept = async (id) => {
    await this.state.landList.methods.makeAvailable(id).send({
      from: this.state.account,
      gas: 1000000,
    })

    window.location.reload()
  }
  handleProcessRequest = async (id, n, address, name) => {
    await this.state.landList.methods.processRequest(id, n).send({
      from: this.state.account,
      gas: 1000000,
    })
    const user = await this.state.landList.methods.getUser(address).call()

    if (user) {
      this.setState({
        uid: user[0],
        uname: user[1],
        ucontact: user[2],
        uemail: user[3],
        ucode: user[4],
        ucity: user[5],
        exist: user[6],
      })
    }
    let data = {
      lemail: this.state.uemail,
      subject:
        n == 3
          ? `${name} has accepted your requested.`
          : `${name} has rejected your requested.`,
      message:
        n == 3
          ? `${name} has accepted your requested. Please check your account.`
          : `${name} has rejected your requested. Please check your account.`,
    }

    console.log(data)
    await axios
      .post('http://localhost:3001/send_mail', data)
      .then((response) => {
        if (response.status == 200) {
          alert('Message Sent.')
        } else {
          alert('Message failed to send.')
        }
      })
    window.location.reload()
  }
  handleRequesterInfo = async (address) => {
    this.setState({ open: true })
    const user = await this.state.landList.methods.getUser(address).call()

    if (user) {
      this.setState({
        uid: user[0],
        uname: user[1],
        ucontact: user[2],
        uemail: user[3],
        ucode: user[4],
        ucity: user[5],
        exist: user[6],
      })
    }
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleViewImages = async (images) => {
    this.setState({ open1: true })

    if (images) {
      this.setState({
        images: images,
      })
    }
  }
  handleClose1 = () => {
    this.setState({ open1: false })
  }

  render() {
    const { classes, assetList } = this.props
    return (
      <Paper className={classes.root}>
        {console.log(assetList)}
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {assetList.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id == 'isAvailable' &&
                          value == 'GovtApproved' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.handleAccept(row['property'])}
                            >
                              Make Available
                            </Button>
                          ) : column.id == 'isAvailable' &&
                            value == 'Pending' ? (
                            <Grid container spacing={2}>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    this.handleProcessRequest(
                                      row['property'],
                                      3,
                                      row['requester'],
                                      row['name'],
                                    )
                                  }
                                >
                                  Accept
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() =>
                                    this.handleProcessRequest(
                                      row['property'],
                                      2,
                                      row['requester'],
                                      row['name'],
                                    )
                                  }
                                >
                                  Reject
                                </Button>
                              </Grid>
                            </Grid>
                          ) : column.id == 'requester' &&
                            value !=
                              '0x0000000000000000000000000000000000000000' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                this.handleRequesterInfo(row['requester'])
                              }
                            >
                              View Request
                            </Button>
                          ) : column.id == 'requester' &&
                            value ==
                              '0x0000000000000000000000000000000000000000' ? (
                            <span>No Requestor</span>
                          ) : column.id == 'document' ? (
                            <a href={row['document']} download>
                              Download Document
                            </a>
                          ) : column.id == 'images' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                this.handleViewImages(row['images'])
                              }
                            >
                              View Images
                            </Button>
                          ) : (
                            value
                          )}
                          <Dialog
                            open={this.state.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle
                              id="alert-dialog-slide-title"
                              style={{ textAlign: 'center' }}
                            >
                              {'Requestor Details'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                <b>Name:</b> {this.state.uname}
                                <br />
                                <b>Address:</b> {row['requester']}
                                <br />
                                <b>Contact Number:</b> {this.state.ucontact}
                                <br />
                                <b>Email ID:</b> {this.state.uemail}
                                <br />
                                <b>City:</b> {this.state.ucity}
                                <br />
                                <b>Postal Code:</b> {this.state.ucode}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleClose}
                                color="primary"
                              >
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Dialog
                            open={this.state.open1}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose1}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle
                              id="alert-dialog-slide-title"
                              style={{ textAlign: 'center' }}
                            >
                              {'View Images'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                {this.state.images.map((image) => (
                                  <img
                                    src={image}
                                    style={{
                                      height: '300px',
                                      width: '400px',
                                      margin: '10px',
                                    }}
                                  />
                                ))}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleClose1}
                                color="primary"
                              >
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  }
}
export default withStyles(styles)(table)
