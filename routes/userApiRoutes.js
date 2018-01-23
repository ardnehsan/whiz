var db = require('../models')
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
        bcrypt.compare(req.body.password, dbData.dataValues.password, function (err, res) {
          // res == true
          if(res){
            if ((!dbData && typeof dbData === "object")){
              console.log("no user")
              res.status(404).send("thing not found yo")
            }else{
              console.log("you found me")
              user.id = dbData.dataValues.id;
              user.name = dbData.dataValues.name;
              user.username = dbData.dataValues.username;
              user.email = dbData.dataValues.email;
              req.session.user.currentUser = user;
              req.session.user.loggedIn = true;
              console.log(req.session.user)
              res.json(req.session.user)
            }

          }
        });
        console.log(dbData)
      });
  })


  app.post("/signUp", function (req, res) {
    console.log(req.body)

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash)
        req.body.password = hash
        db.users.create(req.body).then(function (dbData) {
    
          res.json(dbData);
        });
        res.end()
      });
    });
  });
}