// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var cors = require('cors')

var app = express();
var PORT = process.env.PORT || 3001;

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
require("./routes")(app);//keep this

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
