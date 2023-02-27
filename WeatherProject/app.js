const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var destination = req.body.retemp;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+destination+"&appid=803c9517aca4d380e945ea874a1494cf&units=metric";
    https.get(url,function(response){
        console.log(res.statusCode);

        response.on("data",function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature of "+destination+" is "+temp+" Celcius.</h1>");
            res.write("<h2>"+description+"</h2>");
            res.write("<img src=\""+imageUrl+"\" alt=\"icon\">");
            res.send();
        })
    });
});

app.listen(3000,function(){
    console.log("Server is running great!");
});