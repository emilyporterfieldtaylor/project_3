var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var KKUser = sequelize.define("KKUser", {
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
          },
          // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        favGame: DataTypes.ARRAY
    });



    KKUser.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      KKUser.hasMany(models.Game, {
        onDelete: "cascade"
      });

      KKUser.hasMany(models.Friend, {
        onDelete: "cascade"
      });
    };


    KKUser.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the KKUser Model lifecycle
      // In this case, before a KKUser is created, we will automatically hash their password
      KKUser.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
      return KKUser;
}