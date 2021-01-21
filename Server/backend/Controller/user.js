const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var User = require('../Model/User')
var Govt = require('../Model/Government_Registrar')
var sms = require('../Api/send_sms')
var mail = require('../Api/send_mail')
router.post('/signup', async (req, res) => {
  const { email, name, contact, address, city, postalCode } = req.body
  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return res.status(400).json({
        message: 'User Already Exists',
      })
    }

    user = new User({
      email,
      name,
      contact,
      address,
      city,
      postalCode,
    })

    await user.save()
    res.status(200).send('Thanks for registering!')
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Error in Saving')
  }
})

router.post('/register_govt', async (req, res) => {
  // Insert details straight into MongoDB
    try {
      
      const username="Delhi Government";
      const password="Delhi";
      const address="14, Darya Ganj , New Delhi";
      const contact="01123392027"
      const city="Delhi"
      let user = new Govt({
      username,
      password,
      address,
      contact,
      city,
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    res.status(200).send('Thanks for registering!')
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Error in Saving')
  }       
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    let user = await Govt.findOne({
      username,
    })
    if (!user)
      return res.status(400).json({
        message: 'User Not Exist',
      })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        message: 'Incorrect Password !',
      })
    var payload = { user: user }
    // console.log(payload);
    var token = jwt.sign(payload, 'login successfull')
    res.status(200).send(token)
    // res.send('Login Successfully')
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server Error',
    })
  }
})

router.post('/send_mail', async (req, res) => {
  const { lemail, message, subject, number } = req.body
  mail.send_mail(lemail, message, subject)
  sms.send_sms(number, message)
  res.status(200).send('Mail Sent!')
})

module.exports = router
