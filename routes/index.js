const axios = require("axios");
// let Games = require('../../models/index');

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

function apiRoutes(app) {

/* 
  axios.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://www.boardgamegeek.com/xmlapi/');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); */


 

  app.get("/api/games", (req,res) =>{
    axios.get('https://www.boardgamegeek.com/xmlapi',{
   
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  
    })
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.log(error);
      }).finally(function () {
  
      });
  
  })

 
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name
      });
    }
  });

}

module.exports = apiRoutes;