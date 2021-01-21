import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
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

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      //   password: '',
      address: '',
      postalCode: '',
      city: '',
      contact: '',
      // authenticated: false,
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
    if (window.localStorage.getItem('authenticated') === 'true')
      this.props.history.push('/dashboard')
  }
  validateEmail = (emailField) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (reg.test(emailField) == false) {
      return false
    }
    return true
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }

  login = async (data) => {
    await this.state.landList.methods
      .addUser(
        data.address,
        data.name,
        data.contact,
        data.email,
        data.postalCode,
        data.city,
      )
      .send({ from: this.state.account, gas: 1000000 })
      .on('receipt', function (receipt) {
        // console.log(receipt)
        if (!receipt) {
          console.log('Could not add User. Please try again')
        } else {
          console.log('User has been added successfully!')
          window.alert('User has been added successfully!')
          window.location = '/login'
        }
      })
  }

  handleSubmit = async () => {
    let data = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      address: this.state.address,
      city: this.state.city,
      postalCode: this.state.postalCode,
    }
    if (
      this.state.name &&
      this.state.email &&
      this.state.contact &&
      this.state.address &&
      this.state.city &&
      this.state.postalCode
    ) {
      if (this.validateEmail(this.state.email)) {
        axios.post('http://localhost:3001/signup', data).then(
          (response) => {
            if (response.status == 200) {
              this.setState({
                name: '',
                email: '',
                address: '',
                postalCode: '',
                city: '',
                contact: '',
              })
            }

            try {
              this.login(data)
            } catch (error) {
              console.log('error:', error)
            }
          },
          (error) => {
            this.setState({ loading: false })
            alert('User already exist. Try with another email address')
            this.setState({
              name: '',
              email: '',
              address: '',
              postalCode: '',
              city: '',
              contact: '',
            })
          },
        )
      } else alert('Please, Enter correct Email address')
    } else {
      alert('All fields are required')
    }
  }
  render() {
    const { classes } = this.props
    return (
      <div className="profile-bg">
        <Container style={{ marginTop: '40px' }} className={classes.root}>
          <div className="register-text">Register Here</div>
          <div className="input">
            <TextField
              id="standard-full-width"
              type="name"
              label="Name"
              placeholder="Enter Your Name"
              fullWidth
              value={this.state.name}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('name')}
            />
            <TextField
              id="standard-full-width"
              type="email"
              label="Email Address"
              placeholder="Enter Your Email Address"
              fullWidth
              value={this.state.email}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('email')}
            />
            <TextField
              id="standard-full-width"
              type="contact"
              label="Contact Number"
              placeholder="Enter Your Contact Number"
              fullWidth
              value={this.state.contact}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('contact')}
            />
            <TextField
              id="standard-full-width"
              type="address"
              label="Private Key"
              placeholder="Enter Your Private Key"
              fullWidth
              value={this.state.address}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('address')}
            />
            <TextField
              id="standard-full-width"
              type="city"
              label="City"
              placeholder="Enter Your City"
              fullWidth
              value={this.state.city}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('city')}
            />
            <TextField
              id="standard-full-width"
              type="postalCode"
              label="Postal Code"
              placeholder="Enter Your Postal Code"
              fullWidth
              value={this.state.postalCode}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('postalCode')}
            />
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon>submit</SendIcon>}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </div>
          <div
            style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }}
          >
            Already have an account?{'   '}{' '}
            <a href="/login" style={{ color: '#328888' }}>
              Login here
            </a>
          </div>
        </Container>
      </div>
    )
  }
}
export default withStyles(styles)(Register)
