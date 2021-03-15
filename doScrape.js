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
  
  // await page.waitFor(2000);
  let elementHandle;
  try {
    elementHandle = await page.waitForSelector('#EndOfSurvey', { timeout: 5000 });
  } catch (err) {
    return "Timeout on selector";
  }

  const paragraphsLength = await elementHandle.$$('p');
  if (!paragraphsLength) return 'No paragraphs';

  const paragraphs = await elementHandle.$$eval('p', nodes => nodes.map(n => n.innerText))

  if (paragraphs.find(x => x.indexOf('no appointments') !== -1)) {
    return null;
  };

  return paragraphs.join('\n');

}

module.exports = doScrape;


// await page.pdf({
//     path: outputFileName,
//     displayHeaderFooter: true,
//     headerTemplate: '',
//     footerTemplate: '',
//     printBackground: true,
//     format: 'A4'
// });
