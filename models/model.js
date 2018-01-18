module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 120]
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 120]
        }
      }
    });
    return Location;
  };