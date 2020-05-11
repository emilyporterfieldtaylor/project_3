// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
// var cors = require('cors')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// // Setting up CORS for gaining access to XML
// let corsOptions = {
//   origin: ' http://www.boardgamegeek.com/xmlapi/search?search=',
//   optionsSuccessStatus: 200 
// }

// Requiring models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/.js")(app);
require("./routes/.js")(app);
require("./routes/.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
