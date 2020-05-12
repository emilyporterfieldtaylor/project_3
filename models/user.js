var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name:
        {type:DataTypes.STRING,
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
          }
    });



    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Game, {
        onDelete: "cascade"
      });

      User.hasMany(models.Friend, {
        onDelete: "cascade"
      });
    };


    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
      return User;
}