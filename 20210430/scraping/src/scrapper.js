const cheerio = require('cheerio');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const req = new XMLHttpRequest();

const getURL = 'https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops';


req.open('GET', getURL, false);
req.send(null);

const $ = cheerio.load(req.responseText);
$.html();

console.log($('.caption h4.price').text())
console.log($('.caption h4.title').text())


