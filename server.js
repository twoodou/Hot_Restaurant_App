// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var reservationList = require("./reservations.js");
console.log(reservationList[0].name);
// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Star Wars Characters (DATA)
// =============================================================
// var reservations = [
//   {
//     name: "Dave the Barbarian Family",
//     number: "918.636.6466",
//     email: "davesfamily@netflix.com",
//     id: 100
//   }
// ];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
app.get("/waitlist", function(req, res) {
  res.sendFile(path.join(__dirname, "waitlist.html"));
});
// Get all characters
app.get("/all", function(req, res) {
  res.json(reservationList);
});
// Search for Specific Character (or all characters) - provides JSON
// app.get("/api/:reservations?", function(req, res) {
//   var chosen = req.params.characters;
//
//   if (chosen) {
//     console.log(chosen);
//
//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === reservations[i].routeName) {
//         return res.json(reservations[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(reservations);
// });
//Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newRes = req.body;
  newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();
  console.log(newRes);
  reservationList.push(newRes);
  res.json(newRes);
});
// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
