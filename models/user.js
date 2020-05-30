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
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      provider: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      firstTimeLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });

  // when a user is removed, the games and friends associated will be removed
  User.associate = function (models) {
    User.hasMany(models.Game, {
      onDelete: "cascade",
    });

    User.hasMany(models.Friend, {
      onDelete: "cascade"
    });
  };


  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
}