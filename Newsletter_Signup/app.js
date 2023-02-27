const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.ename;

    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data);
    // now we are going to send this JSON data to mailchimp

    const url = "https://us21.api.mailchimp.com/3.0/lists/780dc2bec6"

    const options = {
        method: "POST",
        auth: "manice:c0d0c47366babc4d8abd625ae60940d3-us21"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData); //we are passing the json data to the mailchimp server
    request.end(); // to specify that we are done with the request
});

app.post("/failure",function(req,res){  // Redirecting back to the signup page if the user couldn't successfully subscribe
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server is running!");
});



//api key : c0d0c47366babc4d8abd625ae60940d3-us21
// audience list id : 780dc2bec6
