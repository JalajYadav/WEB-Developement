//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const items =["Buy Food","Cook Food","Eat Food"];
const workItems =[];
app.get("/", function(req, res){
   const day = date.getDate();
    res.render('list', {listTitle: day,newListItems:items});
});

app.post("/",function (req,res) {
  console.log(req.body);
   const item = req.body.newItem;
  if(req.body.list==="Work "){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
    //console.log(req.body.newItem);
})
app.get("/work",function (req,res) {
  res.render('list', {listTitle: "Work",newListItems:workItems});
})
app.get("/about",function (req,res) {
    res.render('about');
})
/*app.post("/work",function (req,res) {
  let item = req.body.newItem;

   workItems.push(item);

   res.redirect("/work");
   //console.log(req.body.newItem);
})*/
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});



/*
app.get("/", function(req, res){
    let today = new Date();
    let day ="";
    switch (today.getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        day = "Ran into Default at Days "+today.getDay();
        break;
    }
    res.render('list', {kindOfDay: day});
});
*/