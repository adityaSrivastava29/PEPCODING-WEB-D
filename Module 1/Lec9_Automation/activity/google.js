const puppeteer = require("puppeteer");
const id ="gijiyo4273@moxkid.com";
const pw = "12345678";
let tab;
// puppeteer functions => promisifed functions

// open a browser

let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserOpenPromise.then(function (browserInstance) {
    let pagesPromise = browserInstance.pages();
    return pagesPromise; // Promise<Pending>
  })
  .then(function (pages) {
    let page = pages[0];
   // tab = page;
    let gotoPromise = page.goto("https://youtube.com/");
    return gotoPromise;
  });