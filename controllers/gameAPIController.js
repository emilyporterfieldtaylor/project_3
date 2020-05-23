let axios = require('axios');
var convert = require('xml-js');
const db = require('../models');
// const Game = require('../models/games');

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
    getAllFriends: async (req, res) => {
      db.User
        .findAll()
        .then(users => res.json(users))
        .catch(err => console.log(err))
    },

    // findUserById: async (req, res) => {
    //   const { paramsID } = req.params;
    //   db.User
    //     .findAll({
    //       where: { id: req.params.paramsID }
    //     })
    //     .then(user => {
    //       // {status: user.name + ' successfully found!'}
    //       res.json(user)
    //     })
    //     .catch(err => console.log(err))
    // },
    create: function(req, res) {
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
        UserId: req.body.UserId
      }
      db.Game.create(gameData)
        .then(game => {console.log(game)
          res.json({status: game.name + ' successfully entered into database!'});
        })
        .catch(err => {console.log(err)
          res.send('controller error: ' + err)
        })
    },
};
