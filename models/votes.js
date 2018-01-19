module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var Votes = sequelize.define("votes", {
      user: {
          type: DataTypes.STRING,
          //allow Null until we complete user login
          // allowNull: false
      },
      comments_id: {
          type: DataTypes.INTEGER,
          allowNull: false
          //create foreignKey
      },
      upVote: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0,
          allowNull: false
          //if user changes this to true, downVote cannot be true until the user changes upVote to false.
      },
      downVote: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0,
          allowNull: false
          //same as upVote comment but vice versa.
      }
  
    });
    return Votes;
  };
=======
  var Votes = sequelize.define("votes", {
    user: {
    	type: DataTypes.STRING,
        //allow Null until we complete user login
    	// allowNull: false
    },
    comments_id: {
    	type: DataTypes.INTEGER,
    	allowNull: false
        //create foreignKey
    },
    upVote: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: 0,
    	allowNull: false
        //if user changes this to true, downVote cannot be true until the user changes upVote to false.
    }
    downVote: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: 0,
    	allowNull: false
        //same as upVote comment but vice versa.
    }

  });
  return Votes;
};
>>>>>>> master
