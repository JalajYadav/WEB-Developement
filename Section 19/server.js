const express = require('express');
const app = express();
app.listen(2000,function () {
    console.log("Server has started on port 2000");
});
app.get("/",function (req,res) {
   // console.log(req);
   console.log("home route")
    res.send("<h1>hidfsd</h1>");
   
});
app.get("/contact",function (req,res) {
    console.log("contact route");
    res.send("hello u can call me on my cell no 9898989898")
})
