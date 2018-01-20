module.exports = function(sequelize, DataTypes) {

  var Comments = sequelize.define("comments", {
    user: {
    	type: DataTypes.STRING
    	//Keep value as Null until we have a login with user info
    	// allowNull: false
    },
    place_id: {
    	type: DataTypes.TEXT,
    	allowNull: false
    },
    comment: {
    	type: DataTypes.TEXT,
    	allowNull: false
    }

  });
  return Comments;
};

