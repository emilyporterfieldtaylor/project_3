let gameController = require('./controllers/gameAPIController');

// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");


var app = express();
var PORT = process.env.PORT || 3001;

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


// API Calls
// =============================================================
app.get('/api/games/:game', gameController.gameController);
app.get('/api/ids/:id', gameController.findById);
app.post('/api/gameData/', gameController.create);




//temporary: demonstrating passport
require("./routes/html-routes")(app);
 

// Syncing our sequelize models and then starting our Express app
//set "force" to false to prevent it from emptying db each time
// =============================================================
db.sequelize.sync({ force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
