const bcrypt = require('bcrypt')

module.exports = function encrptPassword(clearText) {
  return bcrypt.genSalt(10, function (err, salt) {
    return bcrypt.hash(clearText, salt, function (err, hash) {
      return hash
    });
  });
}