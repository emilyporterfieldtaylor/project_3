module.exports = function(sequelize, DataTypes){
    var Game = sequelize.define("Game", {
      gameId:DataTypes.INTEGER,
      name: DataTypes.STRING,
      // value:DataTypes.STRING,
      // yearPublished:DataTypes.STRING,
      // image: DataTypes.Longblob,
      description: DataTypes.STRING,
      minPlayers: DataTypes.INTEGER,
      maxPlayers: DataTypes.INTEGER,
      minPlayTime: DataTypes.INTEGER,
      maxPlayTime: DataTypes.INTEGER,
      yearPublished: DataTypes.INTEGER,
    })

    // Game.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
    //   Game.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });

    // } 
    return Game;
}
