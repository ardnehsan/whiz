module.exports = function (sequelize, DataTypes) {

  var StoreNames = sequelize.define("storenames", {
    name: {
      type: DataTypes.STRING,
      //Keep value as Null until we have a login with user info
      allowNull: false
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return StoreNames;
};