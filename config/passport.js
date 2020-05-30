var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
// var keys = require("./keys");  //  Hidden variable like .env FILE.
// var User = require("../models/user");
var db = require("../models");

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/auth/google/redirect"
  }, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    db.User.findOne({ where: { email: profile.emails[0].value, provider: "google" } }).then((currentUser) => {
      if (currentUser) {
        // already have the user
        console.log("user is: ", currentUser)
        done(null, currentUser)
      } else {
        // if not, create user in our db
        db.User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id, // I guess we'll have to make the id the password since you are requiring it in the model.
          // However, OAuth2 doesn't need a password. But since you are doing LocalStrategy as well this is OK for now. 
          //We will need to specify the provider "google" in our queries to separate local store users from OAuth
          provider: "google",
          profilePicture: profile.photos[0].value
        })
          .then((newUser) => {
            console.log("new user created: " + newUser);
            done(null, newUser);
            // If there's an error, handle it by throwing up a bootstrap alert
          }).catch(er => console.log(er));
      }
    })
  })
)

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function (email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
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
// "boilerplate" needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
