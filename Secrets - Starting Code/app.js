require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.route("/")
    .get(function(req,res){
        res.render("home");
    });

app.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
    );

app.get("/auth/google/secrets", 
    passport.authenticate('google', { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/secrets");
    });

app.get("/secrets",function(req,res){
    User.find({"secret": {$ne: null}}, function(err,foundUsers){ // searching secrets value of users that are not null
        if(err){
            console.error(err);
        }
        else{
            if(foundUsers){
                res.render("secrets",{usersWithSecrets: foundUsers});
            }
        }
    });
});

app.route("/submit")
    .get(function(req,res){
        if(req.isAuthenticated()){// if the user is authenticated then render the submit page else make them login first
            res.render("submit");
        }
        else{
            res.redirect("/login");
        }
    })
    .post(function(req,res){
        const submitsecret = req.body.secret;
        //passport saves the user's details into the request variable

        User.findById(req.user.id,function(err,foundUser){
            if(err){
                console.error(err);
            }
            else{
                if(foundUser){
                    foundUser.secret = submitsecret;
                    foundUser.save(function(){
                        res.redirect("/secrets");
                    });
                }
            }
        });
    });



app.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
    
});

app.route("/login")
    .get(function(req,res){
        res.render("login");
    })
    .post(function(req,res){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        req.login(user,function(err){
            if(err){
                console.log(err);
            }
            else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/secrets");
                });
            }
        });
    });

app.route("/register")
    .get(function(req,res){
        res.render("register");
    })
    .post(function(req,res){
        User.register({username: req.body.username},req.body.password, function(err,user){
            if(err){
                console.log(err);
                res.redirect("/register");
            }
            else{
                passport.authenticate("local")(req,res,function(){ // that means authentication was successfull and we managed to save their logged in session cookie
                    res.redirect("/secrets");  // if the user ends up in here then we can redirect them to the secret route
                });
            }
        });
    });

app.listen(3000,function(){
    console.log("Server running on port 3000");
});