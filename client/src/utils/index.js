import axios from "axios";
// const express = require("express");
// var app = express();


export default {
  getBoardGame: async function(query) {
      return (
        await axios.get(`https://www.boardgamegeek.com/xmlapi/search?search=${query}`)
      )
  },
  saveGame: async function(gameData) {
    console.log('running saveGame function!!!');
    return  (
      await axios.post("/api/gameData/", gameData)
    )
  }
};