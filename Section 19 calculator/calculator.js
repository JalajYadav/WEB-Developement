const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));


app.listen(3000,function () {
    console.log("server has starded");
})

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})
// app.post("/",function (req,res) {
//     console.log(req.body);
// })

app.post("/",function (req,res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var sum = num1+num2;
    
    res.send("Addition of the given numbers is "+sum);
})


app.get("/bmicalculator",function (req,res) {
    res.sendFile(__dirname+"/bmicalculator.html");
})
app.post("/bmicalculator",function (req,res) {
    var h =parseFloat(req.body.height);
    var w =parseFloat(req.body.weight);
    var bmi = w/(h*h);
    res.send("Your bmi is "+bmi);
})