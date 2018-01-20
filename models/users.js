module.exports = function (sequelize, DataTypes) {
	const bcrypt = require('bcryptjs');
	// require('sequelize-isunique-validator')(sequelize)
	const Sequelize = require("sequelize")
	var UserSchema = sequelize.define('Users', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [6, 128],
					msg: "Username must be between 6 and 128 characters in length"
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 25]
			}
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [6, 128],
					msg: "Email address must be between 6 and 128 characters in length"
				},
				isEmail: {
					msg: "Email address must be valid"
				}
			}
		},
		name: {
			type: DataTypes.STRING
		},
		profileimage: {
			type: DataTypes.STRING
		}
	});
	return UserSchema
}
module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}
module.exports.getUserByUsername = function (username, callback) {
	var query = {
		username: username
	};
	User.findOne(query, callback);
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		callback(null, isMatch);
	});
}
module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}