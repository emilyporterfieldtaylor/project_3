let axios = require('axios');
var convert = require('xml-js');
const db = require('../models');
const Game = require('../models/games');

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

module.exports = {
  gameController: async (req, res) => {
    const { game } = req.params;
    const root = 'https://www.boardgamegeek.com/xmlapi/search?search=';
    const output = await fetchXML(root, game);
    const json = JSON.parse(output);
    // console.log("json: ",json);
    // console.log("output: ", output);
    if (json.errors) {
      res.status(500);
      res.json({
        content: 'Unable to get the data from boardgamegeek.com',
        ...json
      })
    } else {
      res.json(json);
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const root = 'https://www.boardgamegeek.com/xmlapi2/thing?id=';
    const output = await fetchXML(root, id);
    const json = JSON.parse(output);
    if (json.errors) {
      res.status(500);
      res.json({
        content: 'Unable to get the data from boardgamegeek.com',
        ...json
      })
    } else {
      res.json(json);
    }
  },
    findUserById: async (req, res) => {
      db.KKUser
        .findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => console.log(err))
    },
  create: function (req, res) {
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
        // .create(req.body)
        // console.log(gameData)
      .catch(err => res.status(422).json(err));
  },
  hotItems: async (req, res) => {
    const root = 'https://boardgamegeek.com/xmlapi2/hot?type=boardgame';
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

