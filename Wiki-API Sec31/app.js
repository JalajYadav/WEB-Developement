const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");


const app = express()

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useUnifiedTopology: true,useNewUrlParser: true});

const articleSchema = {
    title:String,
    content:String
};
const Article = mongoose.model("article",articleSchema);

app.route("/articles").get(function(req,res){
    Article.find(function(err,foundArticles){
        if(err){
            console.log(err);
        }else{
            res.send(foundArticles);
        }
    })
})
.post(function (req,res) {
    
    const newArticle = new Article({
        title:req.body.title,
        content: req.body.content
    })
    newArticle.save(function (err) {
        if(err){
            console.log(err);
        }else{
            res.send("Successfullt added the new article")
        }
    });
}).delete(function (req,res) {
    Article.deleteMany(function (err) {
        if(!err){
            res.send("Successfullt deleted all article")
        }else{
            console.log(err);
        }
    })
});
///////////////////////////////Request Targeting a Specific article//////////////////////////////////////////
app.route("/articles/:articleTitle")
.get(function (req,res) {
    Article.findOne({title: req.params.articleTitle},function (err, foundArticle) {
        if(foundArticle){
            res.send(foundArticle)
        }else{
            res.send("Sorry did not find any article.")
        }
    })
})
.put(function (req,res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title,content: req.body.content},
        function (err) {
            if(err){console.log(err);}
            else{res.send("Successfullt Updated the entry")}
        }
        )
})
.patch(function (req,res) {
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set: req.body},
        function (err) {
            if(err){console.log(err);}
            else{res.send("Patched the data entry successfully")}
        }
    )
})
.delete(function (req,res) {
    Article.deleteOne({title:req.params.articleTitle},function (err) {
        if(err){console.log(err);}
        else{res.send("Successfully Deleted the entry from the database")}
    })
});


app.listen(3000,function(){
    console.log("Server has started on port 3000.");
})