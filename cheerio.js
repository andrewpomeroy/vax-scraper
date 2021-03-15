const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('dotenv').config();

const URL = process.env.PAGE_URL;
fetch(URL)
  .then(res => res.text())
  .then((body) => {
    // $ = cheerio.load(body);
    // $('#EndOfSurvey').each((index, element) => {
    //   console.log(index);
    // });

    console.log(body)

    // const msg = $('#EndOfSurvey');
    // // console.log(msg)
    // msg.each((index, element) => {
    //   console.log(index)
    // })
    // console.log(msg && msg[0] && msg[0].children && msg[0].children.filter(x => x.innerHTML.indexOf("we have no appointments") !== -1));
    // Array.from($('#EndOfSurvey')[0].children).filter(x => x.innerHTML.indexOf("we have no appointments") !== -1)
  });