const db = require('../models')
const bcrypt = require('bcrypt')


function encryptPassword(clearText) {
  return bcrypt.hashSync(clearText, 10)
}

module.exports = function (app) {
  app.post("/signin", function (req, res) {
    // debugger

    // console.log(req.body)
    // console.log(req.session)
    // console.log(req.session.cookie)

    var user = {}; //found 

    // Load hash from your password DB.
    db.users.findOne({
        where: {
          username: req.body.username,
        }
      })
      .then(function (dbData) {
        // debugger 
        if (dbData) {
          var validPassword = bcrypt.compareSync(req.body.password, dbData.get("password"));
          if (!validPassword) {
            return res.status(403).send("Invalid password.")
          }

          // It will reach this point if the user is found and the password is valid
          // console.log("found")
          user.id = dbData.dataValues.id;
          user.name = dbData.dataValues.name;
          user.username = dbData.dataValues.username;
          user.email = dbData.dataValues.email;
          req.session.user.currentUser = user;
          req.session.user.loggedIn = true;
          // console.log(req.session.user)
          // res.json(req.session.user)

          var whizUser = {
            personOfInterest: user.username
          }
          console.log(whizUser)
          res.render('index', whizUser)

          return;
          // this will stop the eecutaion of the function right on this line, it won't continue on line 64-65
          // This will happen if a user is found
        }

        console.log("no user")
        res.status(404).send("Not found")
      });
    // console.log(dbData)
  })


  app.post("/signUp", function (req, res) {
    req.body.password = encryptPassword(req.body.password)
    db.users.create(req.body).then(function (dbData) {
      res.json(dbData);
    });
    res.end();
  });
}