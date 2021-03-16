require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMsg = function (content) {
  client.messages
    .create({
      body: content,
      from: process.env.TWILIO_SMS_NUMBER,
      to: process.env.RECIPIENT_SMS_NUMBER
    })
    .then(message => console.log(message.sid));
}

module.exports = {
  sendMsg
}
