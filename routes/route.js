//require dependencies
const express = require('express');
const router = express.Router();

var db = require("../models");

router.use(function (req, res, next) {
  res.locals = {
    is_logged_in: ((req.session || {}).user || {}).loggedIn
  };
  next();
});

router.get('/', (req, res, next) => {
  res.render('index'); // at this point we have the res.locals.is_logged_in set already,from line 9
});

router.get('/developers', (req, res, next) => {
  res.render('developers');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});
router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/")
})

router.get("/:id", function (req, res) {

  db.comments.findAll({
    where: {
      place_id: req.params.id
    }
  }).then(function (dbComments) {

    var allTheComments = {
      comments: [],
      form: "<form id='newComment'>" +
        "<h4 class='newInfo'>User: *</h4>" +
        "<input type='text' name='user' id='user' placeholder='Your Username' class='form-control'>" +
        "<h4 class='newInfo'>Comment *</h4>" +
        "<input type='text' min='0' name='comment' class='form-control' id='comment' placeholder='Your comment goes here'>" +

        "<input type='submit' value='Post a comment!' class='btn btn-primary' id='submit'>" +
        "</form>"
    }

    prependComments(dbComments, allTheComments.comments);

    res.render('index', allTheComments)

  });
});


router.post("/:id", function (req, res) {


  db.comments.create({
    user: req.body.user,
    place_id: req.params.id,
    comment: req.body.comment
  }).then(function (results) {
    console.log("This is the results ID: " + results.id)

    res.json(results);

  })
})




router.delete("/:id/:id_comment", function (req, res) {

  db.comments.destroy({
    where: {
      place_id: req.params.id,
      id: req.body.id_comment
    }
  }).then(function (dbComment) {

    res.json(dbComment);

  });
});


router.put("/:id/:id_comment", function (req, res, next) {

  var currentDownVotes = [];
  var currentUpVote = [];

  db.comments.findAll({
    where: {
      place_id: req.params.id,
      id: req.params.id_comment
    }
  }).then(function (dbComments) {


    //this is for upvote

    currentUpVote.push(dbComments[0].dataValues.upVotes)

    var addUpVote = parseInt(req.body.upVote) + parseInt(currentUpVote)

    console.log("This is the addUpVote " + addUpVote);

    //this is for downvote

    currentDownVotes.push(dbComments[0].dataValues.downVotes)

    var addDownVote = parseInt(req.body.downVote) + parseInt(currentDownVotes)





    db.comments.update({
      upVotes: parseInt(addUpVote),
      downVotes: parseInt(addDownVote)
    }, {
      where: {
        id: req.body.id_comment
      }
    }).then(function (dbLike) {
      console.log("This is the result: " + dbLike);

      console.log("Current Up Vote: " + addUpVote);
      console.log("Current Down Vote: " + addDownVote);


      if (addUpVote >= 10 && addDownVote >= 10) {
        db.comments.update({
          busy: false
        }, {
          where: {
            id: req.body.id_comment
          }
        }).then(function (result) {
          res.json(result);
          currentUpVote = [];
          currentDownVote = [];
        })
      } else if (addUpVote >= 10) {
        db.comments.update({
          busy: true
        }, {
          where: {
            id: req.body.id_comment
          }
        }).then(function (result) {
          res.json(result);
          currentUpVote = [];
          currentDownVote = [];
        })
      } else if (addDownVote >= 10) {
        db.comments.update({
          busy: false
        }, {
          where: {
            id: req.body.id_comment
          }
        }).then(function (result) {
          res.json(result);
          currentUpVote = [];
          currentDownVote = [];
        })
      } else {

        currentUpVote = [];
        currentDownVote = [];
        res.json(dbLike);
      }

    });

  })

});



router.get("*", function (req, res) {

  res.render('404')

});






module.exports = router




function prependComments(comments, objectName) {

  if (comments.length >= 5) {

    for (var i = comments.length - 1; i > comments.length - 6; i--) {
      objectName.push(comments[i])
    }

  } else if (comments.length === 4) {


    for (var i = comments.length - 1; i > comments.length - 5; i--) {
      objectName.push(comments[i])
    }

  } else if (comments.length === 3) {


    for (var i = comments.length - 1; i > comments.length - 4; i--) {
      objectName.push(comments[i])
    }

  } else if (comments.length === 2) {


    for (var i = comments.length - 1; i > comments.length - 3; i--) {
      objectName.push(comments[i])
    }

  } else if (comments.length === 1) {


    for (var i = comments.length - 1; i > comments.length - 2; i--) {
      objectName.push(comments[i])
    }

  } else {
    //do nothing
  }

}


// router post call after on click for sign up
// router.post('/signUp', function (req, res) {

//   db.users.create({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//     name: req.body.name

//   }).then(function (results) {
//     console.log("This is the results ID: " + results.id)
//     // res.render('index');
//     console.log()
//   })
// })