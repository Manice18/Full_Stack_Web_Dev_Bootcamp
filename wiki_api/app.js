const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article",articleSchema);

//************************ Requests Targeting all Articles************************

app.route("/articles")

    .get(function(req,res){
        Article.find({},function(err,foundArticles){
            if(!err){
                res.send(foundArticles);
            }
            else{
                res.send(err);
            }
        });
    })

    .post(function(req,res){
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err){
            if(!err){
                res.send("Successfully added a new article!")
            }
            else{
                res.send(err);
            }
        });
    })

    .delete(function(req,res){
        Article.deleteMany({},function(err){
            if(!err){
                res.send("Successfully deleted all the articles");
            }
            else{
                res.send(err);
            }
        });
    });


//************************ Requests Targeting a specific Article************************

app.route("/articles/:articleTitle")

    .get(function(req,res){
        Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
            if(foundArticle){
                res.send(foundArticle);
            }
            else{
                res.send("No articles reguarding that topic was found");
            }
        });
    })
    .put(function(req,res){
        Article.updateOne(
            {title: req.params.articleTitle}, // the article to be searched
            {title: req.body.title, content: req.body.content}, // the article to be replaced
            function(err){
                if(!err){
                    res.send("Successfully updated article");
                }
                else{
                    res.send(err);
                }
            }
        );
    })
    .patch(function(req,res){
        Article.updateOne(
            {title: req.params.articleTitle}, // the article to be searched
            {$set: req.body}, // the article to be replaced, but in this case we replace only the fields that have a new value
            function(err){
                if(!err){
                    res.send("Successfully updated article");
                }
                else{
                    res.send(err);
                }
            }
        );
    })
    .delete(function(req,res){
        Article.deleteOne(
            {title: req.params.articleTitle},function(err){
                if(!err){
                    res.send("Successfully deleted selected article");
                }
                else{
                    res.send(err);
                }
            }
        );
    });


app.listen(3000,function(){
    console.log("Server started on port 3000");
});