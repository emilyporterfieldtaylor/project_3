module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    gameId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    minPlayers: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    minPlayTime: DataTypes.INTEGER,
    maxPlayTime: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER,
  })

  Game.associate = function (models) {

    Game.belongsToMany(models.User, {
      through: 'User_Games'
    })

}
    return Game;
  
}