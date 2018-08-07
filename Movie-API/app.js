const express = require("express");
const app     = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/",  (req,res) => {
    res.render("search")
    
})

app.get("/results",  (req,res) => {
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url,  (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  const data = JSON.parse(body);
  res.render("results", {data: data})
    });
});

app.listen(3000,'localhost',  () =>
console.log("Movie App has started!!!")
);