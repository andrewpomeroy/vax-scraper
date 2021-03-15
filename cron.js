var cron = require('node-cron');
var doScrape = require('./doScrape');
// var job = require('./index');
async function init() {
  let msg = await doScrape();
  if (msg) {
    console.log('YOOOOOOOO');
    console.log(msg);
  }
  else console.log('nothin');
}

cron.schedule('*/10 * * * *', () => {
    init();
  });

