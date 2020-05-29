let axios = require('axios');
var convert = require('xml-js');
const db = require('../models');

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

// Searches the list for the item name, and then returns value or text depending if that element has attributes or elements
const getAttributeValue = (list, name) => {
  var index = list.findIndex(item => (item.name === name));
  if (index === -1) {
    console.log("Missing element: " + name);
  }
  else if (typeof list[index].attributes != "undefined") {
    return list[index].attributes.value;
  }
  else if (typeof list[index].elements != "undefined") {
    return list[index].elements[0].text;
  }
}

module.exports = {
  gameController: async (req, res) => {
    const { game } = req.params;
    const root = 'https://www.boardgamegeek.com/xmlapi/search?search=';
    const output = await fetchXML(root, game);
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

  findByBggId: async (req, res) => {
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
      let game = json.elements[0].elements[0];
      let gameData = {
        gameId: game.attributes.id,
        name: getAttributeValue(game.elements, "name"),
        image: getAttributeValue(game.elements, "image"),
        description: getAttributeValue(game.elements, "description"),
        minPlayers: getAttributeValue(game.elements, "minplayers"),
        maxPlayers: getAttributeValue(game.elements, "maxplayers"),
        minPlayTime: getAttributeValue(game.elements, "minplaytime"),
        maxPlayTime: getAttributeValue(game.elements, "maxplaytime"),
        yearPublished: getAttributeValue(game.elements, "yearpublished"),
      }
      console.log(gameData);
      res.json(gameData);
    }
  },

  getAllFriends: async (req, res) => {
    db.User
      .findAll()
      .then(users => res.json(users))
      .catch(err => console.log(err))
  },

  hotItems: async (req, res) => {
    const root = 'https://boardgamegeek.com/xmlapi2/hot?type=boardgame';
    const output = await fetchXML(root);
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

  gameList: async (req, res) => {
    const root = 'https://boardgamegeek.com/xmlapi2/hot?type=boardgame';
    const output = await fetchXML(root);
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

  create: function (req, res) {
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
      .then(game => {
        res.json({ status: game.name + ' successfully entered into database!' });
      })
      .catch(err => {
        console.log(err)
        res.send('controller error: ' + err)
      })
  }
};

