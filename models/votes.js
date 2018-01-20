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
    	allowNull: false,
    },
    upVote: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: 0,
    	allowNull: false
        validate: {
            upVoteValidation() {
                if (this.downVote === true) {
                    throw new Error('User already down-voted the comment')
                }
            }
        }
    }
    downVote: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: 0,
    	allowNull: false
        validate: {
            downVoteValidation() {
                if (this.upVote === true) {
                    throw new Error('User already up-voted the comment')
                }
            }
        }
    }

  });
  return Votes;
};
>>>>>>> master
