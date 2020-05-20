var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
// var keys = require("./keys");  //  THIS IS A VARIABLE HIDDEN FROM VIEW LIKE A .env FILE.  USE WHICHEVER WORKS BEST.
// var User = require("../models/user");
var db = require("../models");
 

passport.use(
  new GoogleStrategy({
  //options for the google strategy
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "/auth/google/redirect"
},(accessToken, refreshToken, profile, done) => {
  //passport callback function
  console.log("passport callback function fired");
  db.User.create({
    name: profile.displayName,
    email: profile.id,
    password: profile.id
  })
    .then(function(data) {            //   HERE DOWN TO LINE 31 NEEDS TO BE CHANGED TO REDIRECT THE USER TO THE MAIN PAGE.  COME BACK
      window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(er => console.log(er));
    }
  )
)

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
