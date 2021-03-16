require('dotenv').config();

var cron = require('node-cron');
var doScrape = require('./doScrape');
const { sendMsg } = require('./sendMsg');
async function init() {
  let msg = await doScrape();
  if (msg) {
    // normal error message == probably nothing available
    console.log(msg, new Date().toLocaleString());
  }
  else {
    console.log("SUCCESS", new Date().toLocaleString());
    sendMsg("🚨🚨🚨 APPOINTMENTS POSSIBLY AVAILABLE: " + process.env.PAGE_URL);
  }
}

// Runs every minute. Change as needed
cron.schedule('*/1 * * * *', () => {
  init();
});

