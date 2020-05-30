let gameController = require('./controllers/gameAPIController');
const authRoutes = require("./routes/auth-routes");
const path = require("path");
// const cors = require("cors");

// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

var app = express();
var PORT = process.env.PORT || 3002;

// Requiring models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("client/build"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());

// set up cors to allow us to accept requests from our client
// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow to server to accept a request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// )

// set up auth routes for google
app.use("/auth", authRoutes);

app.use(passport.session());


// Routes
// =============================================================
require("./routes")(app);
require("./routes/html-routes")(app);

app.get('/api/games/:game', gameController.gameController);
app.get('/api/ids/:id', gameController.findById);
app.get('/api/gameById/:id', gameController.findByBggId);
app.get('/api/hotitems', gameController.hotItems);
app.get('/api/list/', gameController.gameList);
app.post('/api/gameData/', gameController.create);





// Syncing our sequelize models and then starting our Express app
//set "force" to false to prevent it from emptying db each time
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});