import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Container, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import Land from '../abis/LandRegistry.json'
import profile from '../images/avatar.png'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      authenticated: false,
    }
  }
  componentDidMount = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    await window.localStorage.setItem('web3account', accounts[0])
    this.setState({ account: accounts[0] })
    const balance = await web3.eth.getBalance(accounts[0])
    // const wallet = await web3.utils.toWei(balance, 'ether')
    // balance = balance / 1000000000000000000
    this.setState({ balance: balance / 1000000000000000000 })
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    if (
      !window.localStorage.getItem('authenticated') ||
      window.localStorage.getItem('authenticated') === 'false'
    )
      this.props.history.push('/login')

    const user = await this.state.landList.methods.getUser(accounts[0]).call()
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

  render() {
    return (
      <div className="profile-bg">
        <Container>
          {console.log(this.state)}
          <div className="m-t-180">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <div>
                  <img className="profile-img" src={profile}></img>
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <div className="profile-text">
                  <div className="profile-h">{this.state.uname}</div>
                  <div>
                    <LocationOnIcon
                      style={{ marginTop: '-10px' }}
                    ></LocationOnIcon>
                    {'  '}
                    <span className="profile-t">{this.state.ucity}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <MailIcon style={{ marginTop: '-10px' }}></MailIcon>
                    {'  '}
                    <span className="profile-t">{this.state.uemail}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <PhoneIcon style={{ marginTop: '-10px' }}></PhoneIcon>
                    {'  '}
                    <span className="profile-t">+91-{this.state.ucontact}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <VpnKeyIcon style={{ marginTop: '-10px' }}></VpnKeyIcon>
                    {'  '}
                    <span className="profile-t">{this.state.account}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <AccountBalanceWalletIcon
                      style={{ marginTop: '-10px' }}
                    ></AccountBalanceWalletIcon>{' '}
                    <span className="profile-t">{this.state.balance} ETH</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    )
  }
}
export default Login
