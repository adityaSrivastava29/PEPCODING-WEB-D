const request = require("request");
const cheerio = require("cheerio");

// request => Async function
let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request( link  , cb );

function cb(error , response , htmlkadata){
      evalHTML(htmlkadata);
    // let HtmlKaData =html;
    // console.log(HtmlKaData);
}


function evalHTML(html){
    let ch = cheerio.load(html);
    let winningTeam = ch('.match-header .status-text span').text(); 
    //let winningTeam = ch('.match-info.match-info-MATCH .status-text').text();
    console.log(winningTeam);
}