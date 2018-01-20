// var db = require('../models')
// // console.log(db, "this is db")
// module.exports = function (app){
//   app.post("/api/login", function (req, res) {
//     console.log(req.body)
//     console.log(req.session)
//     console.log(req.session.cookie)
//     var user = {}; //found 
//     db.users.findOne({
//       where: {
//         username: req.body.username,
//         password: req.body.password
//       }
//     })
//       .then(function (dbData) {
//         console.log(dbData)
//         if ((!dbData && typeof dbData === "object")){
//           console.log("no user")
//           res.status(404).send("thing not found yo")
//         }else{
//           console.log("you found me")
//           user.id = dbData.dataValues.id;
//           user.name = dbData.dataValues.name;
//           user.username = dbData.dataValues.username;
//           user.email = dbData.dataValues.email;
//           req.session.user.currentUser = user;
//           req.session.user.loggedIn = true;
//           console.log(req.session.user)
//           res.json(req.session.user)
//         }

//       });
//   })


//   app.post("/api/signUp", function (req, res) {
//     console.log(req.body)
//     db.users.create(req.body).then(function (dbData) {

//       res.json(dbData);
//     });
//   });
// }