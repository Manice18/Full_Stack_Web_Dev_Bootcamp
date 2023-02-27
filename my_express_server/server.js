const express = require('express')
const app = express()

app.get("/",function(request,response){
    response.send("<h1>Hello World!</h1>");
});

app.get("/helu",function(req,res){
    res.send("I am tak the friend of kak!");
});

app.listen(3000); // this means we are listening to port 3000