const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let nextItems = [];
let workItems = [];

app.get("/",function(req,res){
    let day = date.getDate();
    
    res.render("list",{listTitle: day, newItems: nextItems});
});

app.post("/",function(req,res){
    let nextItem = req.body.newitem;
    if(req.body.list==="Work"){
        workItems.push(nextItem);
        res.redirect("/work");
    }
    else{
        nextItems.push(nextItem);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work", newItems: workItems});
});


app.listen(3000,function(){
    console.log("Server is running!");
});
