const express = require("express");
const app     = express();

app.get("/", (req, res) => {
    res.send("Hi,there welcome to my assignment")
})

app.get("/speak/:animal", (req, res) =>{
    const sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "woof",
        cat: "meow",
        tiger: "grrr"
    };
    const animal = req.params.animal;
    let sound = sounds[animal]; res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:word/:num", (req, res) => {

    const word = req.params.word;
    const num = Number(req.params.num)
    let result = ""
    for (let i = 0; i < num; i++) {
        result += word + " ";
    }
    res.send(result);
});

app.get("*", (req, res) => {
    res.send("Sorry page not found!");
});

// Tell express to listen for requests (start server)

app.listen(3000, 'localhost', () =>
    console.log("Server has started!!!")
);