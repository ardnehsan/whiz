const bcrypt = require('bcrypt')

function encryptPassword(clearText, salt) {
  var salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(clearText, salt);
}