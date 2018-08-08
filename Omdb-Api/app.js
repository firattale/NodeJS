const express      = require('express');
const app          = express();
const bodyParser   = require("body-parser");
const request      = require('request');

app.use(express.static(__dirname + '/public'));
app.use (bodyParser.urlencoded({extended:true }));
app.use(bodyParser.json()); // support json encoded bodies
app.set("view engine","ejs");
 
// Root route
app.get('/', (req, res) => {
  // alert is false after opening app, so we cant see any result and error.
  let alert=false;
  res.render('landing', {alert:alert});
});

// POST method route
app.post('/', (req, res) => {
  const search = req.body.search;
  const url = "http://www.omdbapi.com/?apikey=131e5eb6&t=" + search;
  request(url,  (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  const data = JSON.parse(body);
  // alert becomes true and we see the results.
  alert=true;
  res.render("landing", {data: data, alert: alert});
});

});

// Tell express to listen for requests (start server)

app.listen(3000, 'localhost', () => {
console.log("Server has started!!!");
});