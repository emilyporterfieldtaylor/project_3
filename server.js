<<<<<<< HEAD
var express = require("express");
// var cors = require('cors')
=======
// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var cors = require('cors')
>>>>>>> 9a44f0c0c73c08f86fed80505f0722afaf842598

var app = express();
<<<<<<< HEAD
var PORT = process.env.PORT || 8080;
// const api = require('./src/utils')
=======
var PORT = process.env.PORT || 3001;
>>>>>>> 9a44f0c0c73c08f86fed80505f0722afaf842598

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://www.boardgamegeek.com/xmlapi/');
//   next();
// });

// app.use(cors());

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


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
// =============================================================
<<<<<<< HEAD
require("./routes/.js")(app);
require("./routes/.js")(app);
require("./routes/.js")(app);
// app.use(api);

=======
require("./routes")(app);//keep this
>>>>>>> 9a44f0c0c73c08f86fed80505f0722afaf842598

//temporary: demonstrating passport
require("./routes/html-routes")(app);
 

// Syncing our sequelize models and then starting our Express app
//set "force" to false to prevent it from emptying db each time
// =============================================================
db.sequelize.sync({ force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
