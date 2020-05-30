const axios = require("axios");

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const Game = require('../models/games');

function apiRoutes(app) {
  app.get("/api/games", (req, res) => {
    axios.get('https://www.boardgamegeek.com/xmlapi', {
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
  // If the user has valid login credentials, send them to the home page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.cookie('logged_in', true);
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  //  configuration of sequelize user model. If the user is created successfully, proceed to log the user in,
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
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.post("/api/add_friend", function (req, res) {
    console.log('in routes'),
      db.Friend.create({
        name: req.body.name,
        UserId: req.body.userId
      })
        .then(function (friend) {
          console.log('friend in post: ', friend)
          res.json(friend)
        })
        .catch(function (err) {
          res.status(401).json(err)
        })
  })

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name
      });
    }
  });
  //allows games be tied to a specific user 
  app.get("/api/user_games", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Game.findAll({
        where: { UserId: req.user.id }
      })
        .then(function (userData) {
          res.json(userData)
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
  })

  //allows friends to be tied to a specific user
  app.get("/api/users_friends", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Friend.findAll({
        where: { UserId: req.user.id }
      })
        .then(function (userData) {
          res.json(userData)
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
  })

  // allows all friends to be rendered
  app.get("/api/all_friends", function (req, res) {
    db.User.findAll({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
  })

  // choosing a certain friend
  app.get('/api/clicked_friend', function (req, res) {
    db.User.findAll({})
      .then(function (friend) {
        res.json(friend);
      })
      .catch(err => console.log(err));
  })

  app.get('/api/user_profile_friends', function (req, res) {
    db.Friend.findAll({})
      .then(function (friend) {
        res.json(friend);
      })
      .catch(err => console.log(err));
  })

  app.get('/api/user_profile_games', function (req, res) {
    db.Game.findAll({})
    .then(function (game){
      console.log('in routes: ', game)
      res.json(game);
    })
    .catch(err => console.log(err));
  })

  app.get('/api/search_thru_games', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Game.findAll({
        where: { UserId: req.user.id }
      })
      .then(function (userData) {
        res.json(userData)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
    }
  })


}

module.exports = apiRoutes;
