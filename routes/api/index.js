const axios = require("axios");
let Games = require('../../models/index');

axios.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://www.boardgamegeek.com/xmlapi/'); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

axios.get('/api/games', (req, res) => {

})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
}).finally(function (){

});

module.exports = axios;