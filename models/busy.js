module.exports = function(sequelize, DataTypes) {
  var Busy = sequelize.define("busy", {
        numOfUpVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
            //this should take the amount of "True" given from the vote.js table based on the comments_id
            //I think a join would help do this?
            //CHECK CONSTRAINT should be used I think to help with busy column
        },
        numOfDownVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
            //this should take the amount of "False" given from the vote.js table based on the comments_id
            //I think a join would help do this?
            //CHECK CONSTRAINT should be used I think to help with busy column

        },
        busy: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
            //if UpVotes === 10+, this should mean the store is busy and switch the value to true
            //if DownVotes === 10+, this should either keep the value at 0 or change it if the value is true
        },
        comments_id: {
            type: DataTypes.INTEGER,
            allowNull: false
            //create foreign key
        }

    });
  return Busy;
};

