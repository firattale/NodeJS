const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", function (req,res) {
    res.render("search")
    
})

app.get("/results", function (req,res) {
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  const data = JSON.parse(body);
  res.render("results", {data: data})
        
    });

    });


app.listen(process.env.PORT, process.env.IP, function () {
console.log("Movie App has started!!!"
)}
);