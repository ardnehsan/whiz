const db = require('../models')
const bcrypt = require('bcrypt')


function encryptPassword(clearText) {
  return bcrypt.hashSync(clearText, 10)
}

module.exports = function (app){
  app.post("/signin", function (req, res) {
    console.log(req.body)
    console.log(req.session)
    console.log(req.session.cookie)

    var user = {}; //found 

    // Load hash from your password DB.
    db.users.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(function (dbData) {
      if(bcrypt.compareSync(req.body.password, dbData.password)) {
        console.log('found!!')
      } else {
        console.log('nope!')
      }
      console.log(dbData)
      
      if ((!dbData && typeof dbData === "object")){
        console.log("no user")
        res.status(404).send("Not found")
      }else{
        console.log("found")
        user.id = dbData.dataValues.id;
        user.name = dbData.dataValues.name;
        user.username = dbData.dataValues.username;
        user.email = dbData.dataValues.email;
        req.session.user.currentUser = user;
        req.session.user.loggedIn = true;
        console.log(req.session.user)
        res.json(req.session.user)
      }

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