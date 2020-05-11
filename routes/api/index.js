const axios = require("axios");

axios.get('https://www.boardgamegeek.com/xmlapi2/thing?id=1')
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
}).finally(function (){

});

module.exports = axios;