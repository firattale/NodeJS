var express = require("express");
var app = express();

app.get("/", function (req,res) {
    res.send("Hi,there welcome to my assignment");
});

app.get("/speak/:animal", function (req,res) {
    var sounds = {
        pig:"Oink",
        cow:"Moo",
        dog:"woof",
        cat:"meow",
        tiger:"grrr"
    };
    var animal = req.params.animal;
    var sound = sounds[animal];
    res.send("the "+ animal + " says " + sound);
});

app.get("/repeat/:word/:num", function (req,res) {
    
    var word = req.params.word;
    var num = Number(req.params.num)
    var result = ""
    for (var i = 0; i < num; i++) {
            result += word + " ";
        }
    res.send(result);
    
});

app.get("*", function (req,res) {
 res.send("Sorry page not found!");
    
});

// Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function () {
console.log("Server has started!!!"
)}
);