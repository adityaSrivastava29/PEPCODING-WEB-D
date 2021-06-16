const puppeteer = require("puppeteer");
const id ="";
const pw = "";
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
    tab = page;
  
    let gotoPromise = tab.goto("https://www.facebook.com/");
    return gotoPromise;
  })
  .then(function(){
 
    let idTypePromise = tab.type("#email"  , id);
      return idTypePromise;
  })
  .then(function(){
      let pwTypePromise = tab.type("#pass" , pw);
      return pwTypePromise;
  })
  .then(function(){
      
    
    let loginPromise = tab.click('button[data-testid="royal_login_button"]');
      return loginPromise;
  })
  .then(function(){
      console.log("login succesfull !");
  })
  .catch(function(err){
      console.log("Inside catch");
      console.log(err);
  })