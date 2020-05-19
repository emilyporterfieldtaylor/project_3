let axios = require('axios');
var convert = require('xml-js');
const db = require('../models');
const Game = require('../models/games');

const fetchXML = async (root, game) => {
    try {
      const response = await axios.get(`${root}${game}`);
      return response;
      return convert.xml2json(response.data);
    } catch (err) {
      return {
        error: err.message
      }
    }
  }

// Defining methods for the booksController
module.exports = {
    gameController: async (req, res) => {
        const { game } = req.params;
        const root = 'https://www.boardgamegeek.com/xmlapi/search?search=';
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
    },
    findById:  async (req, res) => {
        const { id } = req.params;
        const root = 'https://www.boardgamegeek.com/xmlapi2/thing?id=';
        const output = await fetchXML(root, id);
        const json = JSON.parse(output);
        // console.log("json: ",json);
        // console.log("output: ", output);
        if (json.errors) {
            res.status(500);
            res.json({
            content: 'Unable to get the data from boardgamegeek.com',
            ... json
            })
        } else {
            res.json(json);
        }
    },
    create: function(req, res) {
      // console.log('in the controller');
      let gameData = {
        gameId: req.body.gameId,
        name: req.body.name,
        yearPublished: req.body.yearPublished,
        description: req.body.description,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        minPlayTime: req.body.minPlayTime,
        maxPlayTime: req.body.maxPlayTime,
        yearPublished: req.body.yearPublished,
      }
      // console.log("controller data: ", gameData)
      db.Game.create(gameData)
      // call db to connect with database, then exported variable from model file
        // .create(req.body)
        // console.log(gameData)
        .then(game => {
          res.json({status: game.name + ' successfully entered into database!'});
        })
        .catch(err => {
          res.send('controller error: ' + err)
        })
          // console.log(err)); 
          // res.status(422).json(err));
    },
    hotItems: async (res) => {
      const root = 'https://boardgamegeek.com/xmlapi2/hot?boardgame';
      const output = await fetchXML(root);
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
    }
};

