const express = require('express');
const bodyparser = require('body-parser');
const https = require("https");

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.write("<h1>hello there!<h1>");
    res.send();
});

app.get("/help",function(req,res){
    res.write("<h1>This is a helper page!</h1>");
    res.write("<p>this page is going to teach you how the backend work.</p>");
});

app.get("/weather",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/weather",function(req,res){
    var desti = req.body.destination;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+desti+"&appid=803c9517aca4d380e945ea874a1494cf&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            res.write("<h1>The temperature of "+desti+" is "+temp+".</h1>");
            res.write("<p>The weather condition is "+description+".");
            res.send();
        });
    });
});


app.get("/anime",function(req,res){
    res.sendFile(__dirname+"/waifu.html");
});

app.post("/anime",function(req,res){
        var mytag = req.body.nam;
    const url = "https://api.waifu.im/search?included_tags="+mytag;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const waifu = JSON.parse(data);
            console.log(waifu);
            const imageUrl = waifu.images[0].url;
            console.log(waifu.images[0].url);
            res.write("<picture><img src=\""+imageUrl+"\" alt=\"Flowers\" style=\"width:500px; height:500px;\"></picture>")
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("server is running!");
});