let axios = require('axios');
var convert = require('xml-js');

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

// Defining methods for the booksController
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
    }
};
