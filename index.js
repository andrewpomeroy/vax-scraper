require('dotenv').config();
const doScrape = require('./doScrape');

async function init () {
  let msg = await doScrape();
  console.log(msg);
  process.exit();
}

init();
