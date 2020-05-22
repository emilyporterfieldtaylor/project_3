module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    gameId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    // value:DataTypes.STRING,
    // yearPublished:DataTypes.STRING,
    // image: DataTypes.Longblob,
    description: DataTypes.TEXT,
    minPlayers: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    minPlayTime: DataTypes.INTEGER,
    maxPlayTime: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER,
  })

  Game.associate = function (models) {
    // We're saying that a game should belong to a user
    // A game can't be created without an user due to the foreign key constraint
    Game.belongsTo(models.User, {
      foreignKey: {
        //may need to change back to true
        allowNull: false
      }
    });

  }
  return Game;
}