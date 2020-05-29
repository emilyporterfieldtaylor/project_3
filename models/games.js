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

    Game.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }
  return Game;

}