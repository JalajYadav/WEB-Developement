const express = require("express");
const https = require("https");     

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


 app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
    //  This is a basic check u should perform everytime
    // res.send("Server is up and Running :)"); 
}) 

app.post("/",function (req,res) {
    
    const city = req.body.CityName;
    const app_id = "Your API ID";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+app_id+"&units="+unit;
     
     https.get(url,function (response) {
        console.log(response.statusCode); 

        response.on("data",function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
           // console.log(JSON.parse(data).main.temp);
           //               OR
           // console.log(weatherData.main.temp);
           //               OR
           console.log(temperature);
           console.log(desc);
           res.write("<h1>The temperature in "+city+" is "+temperature+" degree celcius.</h1>");
           res.write("<p>The weather is "+desc+"</p>");
        
           const icon = weatherData.weather[0].icon;
           const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<img src ='"+icon_url+"'>");
           res.send();
            
        })
     }); 
      
});
    
app.listen(3000,function()
{
    console.log("Server is Listening on Port:3000 ");
});