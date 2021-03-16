require('dotenv').config();
const puppeteer = require('puppeteer')

async function doScrape() {

  const browser = await puppeteer.launch({
      executablePath: process.env.BROWSER_PATH,
      ignoreHTTPSErrors: true,
      headless: true,
      devtools: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  await page.goto(process.env.PAGE_URL, {
      waitUntil: 'networkidle2'
  });
  
  let errorElementHandle;
  let newHandle;
  try {
    errorElementHandle = await page.waitForSelector('.openingsData.openingsNoData', { timeout: 10000 });
  } catch (err) {
    // if 10 seconds have passed and it doesn't find an error message ('no appointments available'), we'll try and grab the "openings" data it displays
    try {
      newHandle = await page.waitForSelector('.openingsData', { timeout: 10000 });
    }
    catch (err) {
      // shit's just too slow; give up
      return "Timeout on selector";
    }
  }

  // returning null means the site isn't displaying the "no openings" message, this means there are possibly openings available!
  if (newHandle) {
    return null;
  }

  // if the typical case unfolds and we're just catching the 'error' message, though it's probably going to be the "no appointments available" message, we'll log the message text to the console just in case it's something else worth seeing
  const errorMsg = await errorElementHandle.$eval('div', el => el.innerText);
  return errorMsg;

}

module.exports = doScrape;
