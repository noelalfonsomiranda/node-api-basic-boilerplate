const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN
const mailgun = require('mailgun-js')({apiKey, domain})

module.exports = {
  sendMail: data => mailgun.messages().send(data)
}