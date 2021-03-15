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
  let errorElementHandle;
  let newHandle;
  try {
    errorElementHandle = await page.waitForSelector('.openingsData.openingsNoData', { timeout: 10000 });
  } catch (err) {
    // return "Timeout on selector";
    try {
      newHandle = await page.waitForSelector('.openingsData', { timeout: 10000 });
    }
    catch (err) {
      return "Timeout on selector";
    }
  }

  if (newHandle) {
    return null;
  }

  // console.log(errorElementHandle);

  const errorMsg = await errorElementHandle.$eval('div', el => el.innerText);
  return errorMsg;
  // const errorMsg = await errorElementHandle.$$('.errormessage');
  // console.log(errorMsg.children);
  // if (!errorMsg) return 'No error message?';
  // else return errorMsg.innerText;
  

  // const paragraphs = await elementHandle.$$eval('p', nodes => nodes.map(n => n.innerText))

  // if (paragraphs.find(x => x.indexOf('no appointments') !== -1)) {
  //   return null;
  // };

  // return paragraphs.join('\n');

  // var fullStr = "";
  // var recurse = function (elm) {
  //   if (elm.innerText) {
  //     fullStr += elm.innerText;
  //     fullStr += '\n';
  //   }
  //   if (elm.children) {
  //     // return Array.from(elm.children).forEach((child) => {
  //     //   console.log(child);
  //     //   console.log(child.innerText);
  //     //   recurse(child)
  //     // })
  //     return Array.prototype.forEach.call(elm.children, (child) => {
  //       console.log(child.innerText);
  //       recurse(child)
  //     })
  //   }
  //   else return;
  // }
  // recurse(errorMsg);
  // console.log(fullStr);

  // if (fullStr.indexOf("we couldn't find any open appointments") === -1) {
  //   return null;
  // }
  // else return fullStr;

}

module.exports = doScrape;
