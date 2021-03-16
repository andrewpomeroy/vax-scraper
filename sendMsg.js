require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMsg = function (content) {
  const recipients = process.env.RECIPIENT_SMS_NUMBERS.split(" ");
  console.log("Sending success message to:", recipients);
  recipients.forEach(function (recipient) {
    client.messages
      .create({
        body: content,
        from: process.env.TWILIO_SMS_NUMBER,
        to: recipient
      })
      .then(message => console.log(message.sid));
  });
}

module.exports = {
  sendMsg
}
