module.exports = function (sequelize, DataTypes) {
	const Sequelize = require("sequelize")
	var Users = sequelize.define('users', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [6, 128],
					msg: "Username must be between 6 and 128 characters in length"
				},
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
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
		}
	});
	return Users;
};