module.exports = function(sequelize, DataTypes) {
    var Friend = sequelize.define("Friend", {
        name:{ 
            
        type:DataTypes.STRING,
        allowNull: false
        }
    })
    Friend.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Friend.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });

    }   

    return Friend;
}