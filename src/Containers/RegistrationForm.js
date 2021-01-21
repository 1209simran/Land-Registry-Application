import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Land from '../abis/LandRegistry.json'
import ipfs from '../ipfs'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pan: '',
      occupation: '',
      state: '',
      address: '',
      postalCode: '',
      city: '',
      contact: '',
      laddress: '',
      lstate: '',
      lcity: '',
      lamount: '',
      larea: '',
      lpostalCode: '',
      ipfsHash: '',
      checked: false,
      buffer: null,
      images: [],
      image: [],
    }
  }

  componentDidMount = async () => {
    const web3 = window.web3
    const acc = await window.localStorage.getItem('web3account')
    this.setState({ account: acc })
    // console.log(acc)
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
  handleChangeCheckbox = (event) => {
    this.setState({ checked: !this.state.checked })
  }

  async propertyID(laddress, lamount) {
    const propertyId = await this.state.landList.methods
      .computeId(laddress, lamount)
      .call()
    this.setState({ propertyId })
    console.log(propertyId)
  }

  async Register(data, account, laddress, lamount) {
    var buf = Buffer.from(JSON.stringify(data))
    ipfs.files.add(buf, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        return
      }
      this.state.landList.methods
        .Registration(
          account,
          result[0].hash,
          laddress,
          lamount,
          this.state.propertyId,
          'Not Approved',
          'Not yet approved by the govt.',
        )
        .send({
          from: this.state.account,
          gas: 1000000,
        })
        .on('receipt', function (receipt) {
          console.log(receipt)
          if (!receipt) {
            console.log('Transaction Failed!!!')
          } else {
            console.log('Transaction succesful')
            window.alert('Transaction succesful')
            console.log(data)
            window.location = '/dashboard'
          }
        })
      this.setState({ ipfsHash: result[0].hash })
    })

    // console.log(transaction)
  }
  handleSubmit = () => {
    const account = this.state.account
    const laddress = this.state.laddress
    const lamount = this.state.lamount

    let data = {
      name: this.state.name,

      email: this.state.email,
      contact: this.state.contact,
      pan: this.state.pan,
      address: this.state.address,
      state: this.state.state,
      city: this.state.city,
      postalCode: this.state.postalCode,
      occupation: this.state.occupation,
      laddress: this.state.laddress,
      lstate: this.state.lstate,
      lcity: this.state.lcity,
      lpostalCode: this.state.lpostalCode,
      larea: this.state.larea,
      document: this.state.buffer,
      images: this.state.image,
    }
    // console.log(data)
    if (data) {
      try {
        this.propertyID(laddress, lamount)
        this.Register(data, account, laddress, lamount)
      } catch (error) {
        console.log('error:', error)
      }
    } else {
      window.alert('All fields are required.')
    }
  }
  onChange = (e) => {
    // Assuming only image
    const file = e.target.files[0]
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({ buffer: reader.result })
    }
  }
  fileSelectedHandler = async (e) => {
    await this.setState({ images: [...e.target.files] })
    for (let i = 0; i < this.state.images.length; i++) {
      const file = this.state.images[i]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      console.log(file)
      reader.onload = (e) => {
        this.setState({ image: [...this.state.image, e.target.result] })
      }
    }
  }

  render() {
    return (
      <Container style={{ marginTop: '30px' }}>
        {console.log(this.state.image)}
        <h1 style={{ textAlign: 'center', fontWeight: '600' }}>
          Owner's Details
        </h1>
        <div className="input">
          <TextField
            id="standard-full-width"
            type="name"
            label="Owner's Name"
            placeholder="Enter Owner's Name"
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
            type="account"
            label="Private Key"
            fullWidth
            value={this.state.account}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <TextField
            id="standard-full-width"
            type="email"
            label="Owner's Email ID"
            placeholder="Enter Owner's Email ID"
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
            label="Owner's Contact Number"
            placeholder="Enter Owner's Contact Number"
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
            type="pan"
            label="PAN Number"
            placeholder="Enter Owner's PAN Number"
            fullWidth
            value={this.state.pan}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('pan')}
          />
          <TextField
            id="standard-full-width"
            type="occupation"
            label="Occupation"
            placeholder="Enter Owner's Occupation"
            fullWidth
            value={this.state.occupation}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('occupation')}
          />
          <TextField
            id="standard-full-width"
            type="address"
            label="Owner's Permanent Address"
            placeholder="Enter Owner's Permanent Address"
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
            type="State"
            label="State"
            placeholder="Enter Your State"
            fullWidth
            value={this.state.state}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('state')}
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
        <h1
          style={{ textAlign: 'center', fontWeight: '600', marginTop: '30px' }}
        >
          Land Details
        </h1>
        <div className="input">
          <TextField
            id="standard-full-width"
            type="address"
            label="Address"
            placeholder="Enter Land's Identification Mark"
            fullWidth
            value={this.state.laddress}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('laddress')}
          />
          <TextField
            id="standard-full-width"
            type="State"
            label="State"
            placeholder="Enter State"
            fullWidth
            value={this.state.lstate}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('lstate')}
          />
          <TextField
            id="standard-full-width"
            type="city"
            label="City"
            placeholder="Enter City"
            fullWidth
            value={this.state.lcity}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('lcity')}
          />
          <TextField
            id="standard-full-width"
            type="postalCode"
            label="Postal Code"
            placeholder="Enter Postal Code"
            fullWidth
            value={this.state.lpostalCode}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('lpostalCode')}
          />
          <TextField
            id="standard-full-width"
            type="area"
            label="Area (in square meters)"
            placeholder="Enter Area"
            fullWidth
            value={this.state.larea}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('larea')}
          />
          <TextField
            id="standard-full-width"
            type="amount"
            label="Total Amount"
            placeholder="Enter Total Amount"
            fullWidth
            value={this.state.lamount}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('lamount')}
          />
          <label for="file">Upload Legal Documents</label>
          <br />
          {/* <input type="file" onChange={this.onFileChange} /> */}
          <form>
            <input
              ref="file"
              type="file"
              name="user[image]"
              // multiple="true"
              onChange={this.onChange}
            />
            {this.state.buffer && <iframe src={this.state.buffer}></iframe>}
          </form>
          <label for="file">Upload Pictures of Land/Plot</label>
          <br />
          <form>
            <input
              ref="file"
              type="file"
              name="user[image]"
              multiple="true"
              onChange={this.fileSelectedHandler}
            />
          </form>
          {this.state.images &&
            [...this.state.images].map((file) => (
              <img
                src={URL.createObjectURL(file)}
                style={{ height: '100px', width: '200px', margin: '10px' }}
              />
            ))}
        </div>
        <FormControlLabel
          style={{ marginTop: '20px', float: 'center' }}
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChangeCheckbox}
              name="checked"
              color="primary"
            />
          }
          label="I agree to the Terms and Conditions"
        />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {this.state.checked ? (
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon>submit</SendIcon>}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon>submit</SendIcon>}
              disabled
            >
              Submit
            </Button>
          )}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          Already Registered?{'   '} <a href="/dashboard">Check Status</a>
        </div>
      </Container>
    )
  }
}
export default Register
