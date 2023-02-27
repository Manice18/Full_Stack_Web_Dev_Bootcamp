const express = require('express');
const bodyparser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    var typeOfWaifu = req.body.wai;
    const url = "https://api.waifu.im/search/?is_nsfw=true&included_tags="+typeOfWaifu;
    https.get(url,function(response){
        console.log(res.status);

        response.on("data",function(data){
            const waidata = JSON.parse(data);
            const waiImage = waidata.images[0].url;
            res.write("<h1> the boobies </h1>");
            res.write("<img src=\""+waiImage+"\" width=\"500px\" height=\"500px\" alt=\"waifu image\">");
            res.send();
        })
    });
});


app.listen(3000,function(){
    console.log("Server is running!");
});


