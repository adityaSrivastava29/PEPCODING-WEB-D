const puppeteer = require("puppeteer");
const id = "kaleenbhaiya___07";
const pw = "qwerty@123";

(async function () {
    try{
        let browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          args: ["--start-maximized"],
         // executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("https://www.instagram.com/");
        await tab.waitForSelector('input[name="username"]');
        await tab.type('input[name="username"]', id);
        await tab.type('input[name="password"]', pw);
        await tab.click('button[type="submit"]');
       //await tab.goto("https://www.instagram.com/pepcoding/");
        //await tab.click('button.sqdOP.yWX7d.y3zKF');
        console.log("Successfull");
    }
    catch(err){
        console.log(err);
    }
})();
