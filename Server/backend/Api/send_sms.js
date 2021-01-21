// const express = require("express");
const Nexmo = require('nexmo')
// const router = express.Router();
const config = require('../Config/db_config')

const nexmo = new Nexmo(
  {
    apiKey: config.NEXMO_API_KEY,
    apiSecret: config.NEXMO_API_SECRET,
  },
  { debug: true },
)

exports.send_sms = function (number, text) {
  const to = '91' + number
  const from = 'Land Registry'
  console.log(number, text)
  nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (responseData) {
      console.log(responseData)
    }
  })
}
