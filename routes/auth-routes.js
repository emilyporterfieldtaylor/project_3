const router = require("express").Router();
const passport = require("passport");
const path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const routeHelper = require("./utils/routeHelper")

// auth login
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  console.log("logging user out on server");
  req.logout();
  res.clearCookie("logged_in");
  res.clearCookie("first_log");
  res.redirect(routeHelper());
})

// auth with google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

const passportGoogle = (req, res) => {
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed"
    }, (error, user, isFirstTime) => {
      res.cookie('logged_in', true);
      req.user = {name: user.dataValues.name};
      // console.log("result:  ", user.dataValues.name)
  
      if (isFirstTime) {
        res.cookie('first_log', true);
        res.redirect(routeHelper() + "/hotitems");
      } else {
      res.redirect(routeHelper() + "/home");
      }
      })(req, res);
}

// // callback route for google to redirect to 
// router.get("/google/redirect", passport.authenticate("google", {session: false}), (req, res) => {
//   // location.replace("http://localhost:3000/home");
//   res.redirect("/home")
// })
// router.route("/google").post(passportGoogle);

router.get("/google/redirect", passportGoogle);

module.exports = router;