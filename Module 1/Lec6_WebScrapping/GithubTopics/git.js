let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");



let link ="https://github.com/topics";

request(link, function(error,response,data){
   processhtml(data);
})


function createTopicFolder(TopicName){
    let topicFolderPath = `./${TopicName}`;
    fs.mkdirSync(topicFolderPath);
}

function createProjectFile(projectName,TopicName)
{
    let topicFolderPath = `./${TopicName}/${projectName}`;
    fs.mkdirSync(topicFolderPath);
}

function processhtml(data)
{
    let ch = cheerio.load(data);
    let Alltopics = ch(".container-lg .gutter li");

    //fs.writeFileSync("githubtopics.html" , Alltopics+"");
        let topic1 = "https://github.com"+ch(Alltopics[0]).find("a").attr("href");
        let topic2 = "https://github.com"+ch(Alltopics[1]).find("a").attr("href");
        let topic3 = "https://github.com"+ch(Alltopics[2]).find("a").attr("href");
        
        let t1=topic1.split("/topics/")[1];
        let t2=topic2.split("/topics/")[1];
        let t3=topic3.split("/topics/")[1];
        createTopicFolder(t1);
        createTopicFolder(t2);
        createTopicFolder(t3);
        console.log(topic1);
        console.log(topic2);
        console.log(topic3);
    //console.log(topics);
}



