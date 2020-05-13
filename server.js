// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var cors = require('cors')
var convert = require('xml-js');
let axios = require('axios');


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
const fetchXML = async (root, game) => {
  try {
    const response = await axios.get(`${root}${game}`);
    return convert.xml2json(response.data);
  } catch (err) {
    return {
      error: err.message
    }
  }
}

app.get('/api/games/:game', async (req, res) => {
  const { game } = req.params;
  const root = 'https://www.boardgamegeek.com/xmlapi2/search?query=';
  const output = await fetchXML(root, game);
  const json = JSON.parse(output);
  console.log("json: ",json);
  console.log("output: ", output);
  if (json.errors) {
    res.status(500);
    res.json({
      content: 'Unable to get the data from boardgamegeek.com',
      ... json
    })
  } else {
    res.json(json);
  }
})


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
