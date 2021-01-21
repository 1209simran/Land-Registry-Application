import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import Land from '../abis/LandRegistry.json'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '&  .MuiInputBase-root': {
      color: '#fff',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: '#fff',
    },
    '&  .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '&  .MuiInput-underline:hover': {
      borderBottomColor: '#fff',
    },
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#328888',
      fontFamily: "'Roboto Condensed', sans-serif",
    },
  },
})
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      authenticated: false,
    }
  }
  componentDidMount = async () => {
    const web3 = window.web3
    const acc = await window.localStorage.getItem('web3account')
    this.setState({ account: acc })
    console.log(acc)
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    if (window.localStorage.getItem('authenticated') === 'true')
      this.props.history.push('/dashboard_govt')
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }
  handleSubmit = async () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    }
    if (this.state.username && this.state.password) {
      axios.post('http://localhost:3001/login', data).then((response) => {
        if (response.status == 200) {
          window.alert('Login Successful')
          window.localStorage.setItem('authenticated', true)
          console.log(response.data)
          window.localStorage.setItem('token', response.data)

          // this.setState({ user: response.data })
          // console.log(this.state.user)
          window.location = '/dashboard_govt'
          this.setState({
            username: '',
            password: '',
          })
        } else {
          this.setState({ loading: false })
          alert('Wrong Credentials')
          this.setState({
            username: '',
            password: '',
          })
        }
      })
    } else {
      alert('All fields are required')
    }
  }
  render() {
    const { classes, assetList } = this.props

    return (
      <div className="profile-bg">
        <Container style={{ marginTop: '40px' }} className={classes.root}>
          <div className="login-text">Government Portal</div>
          <div className="input">
            <TextField
              id="standard-full-width"
              type="username"
              label="Username"
              placeholder="Enter Your Username"
              fullWidth
              value={this.state.username}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('username')}
            />
            <TextField
              id="standard-full-width"
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              fullWidth
              value={this.state.password}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('password')}
            />
          </div>

          <div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon>submit</SendIcon>}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
export default withStyles(styles)(Login)
