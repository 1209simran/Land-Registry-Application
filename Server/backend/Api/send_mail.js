const nodemailer = require('nodemailer')
const config = require('../Config/db_config')

const mailtransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password,
  },
})

exports.send_mail = function (lemail, message, subject) {
  const to = lemail
  console.log(to)

  mailtransport.sendMail(
    {
      from: config.email,
      to,
      subject,
      text: message,
    },
    function (err) {
      if (err) console.log("Email can't be send, due to" + err)
      else console.log('Email sent to host successfully!')
    },
  )
}
