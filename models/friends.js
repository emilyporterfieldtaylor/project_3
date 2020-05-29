module.exports = function (sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //A friend belongs to a certain user
  Friend.associate = function (models) {
    Friend.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

  }

  return Friend;
}