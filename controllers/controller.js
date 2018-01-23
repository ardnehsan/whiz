
var db = require("./../models");

module.exports = function(app) {

<<<<<<< HEAD
  
  app.get("/places/:place_id/:user?", function(req, res) {
=======
router.get('/signup', (req, res, next) => {
  res.render('signup');
});
router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.get("/:id", function(req, res) {
>>>>>>> 66f33cfefe226447bbb6bdf5cfe94e2e2d0fa291
    
    db.Comments.findAll({
    	where: {
    		place_id: req.params.place_id
    	}
    }).then(function(dbComments) {
      
      res.json(dbComments);
    });
  });

app.post("/places/:place_id/:user", function(req, res) {
            
    db.Comments.create({
      user: req.params.user,
      place_id: req.params.place_id,
      comment: req.body.comment
    }).then(function(){	

    	db.Votes.create({
    		user: req.params.user,
    		comment_id: db.Comments.id
    	});
    	db.Busy.create({
    		comment_id: db.Comments.id
    	})

    }).then(function(dbComment) {


      
      res.json(dbComment);
    });
  });


app.delete("/places/:place_id/:user", function(req, res) {
    
    db.Comments.destroy({
      where: {
      	id: req.body.id,
        place_id: req.params.place_id,
        user: req.params.user
      }
    }).then(function(){

    	db.Votes.destroy({
    		where: {
    			comment_id: db.Comments.id
    		}
    	})

    	db.Busy.destroy({
    		where: {
    			comment_id: db.Comments.id
    		}
    	})

    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });



app.put("/places/:place_id/:user", function(req, res) {
    
    db.Comment.update({
      comment: req.body.comment
    }, {
      where: {
      	id: req.body.id,
        place_id: req.params.place_id,
        user: req.params.user
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

// app.put("/places/:place_id/:user", function(req, res) {
    
//     db.Votes.update({
//     	upVote: 1++
//     }, {
//       where: {
//         comment_id: db.Comments.id,
//       }
//     }).then(function(dbComment) {
//       res.json(dbComment);

// 	      if (db.Votes.upVote >= 10) {
// 	      	 db.Busy.update({
// 	      	 	busy: 1,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }
// 	      else if (dbComment.upVote >= 10 && dbComment.downVote >=10) {
// 	      	db.Busy.update({
// 	      	 	busy: 0,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }
// 	      else {
// 	      	db.Busy.update({
// 	      	 	busy: 0,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }

//        })
//     });


// app.put("/places/:place_id/:user", function(req, res) {
    
//     db.Votes.update({
//     	downVote: 1++
//     }, {
//       where: {
//         comment_id: db.Comments.id,
//       }
//     }).then(function(dbComment) {
//       res.json(dbComment);


// 	      if (db.Votes.downVote >= 10) {
// 	      	 db.Busy.update({
// 	      	 	busy: 0,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }
// 	      else if (dbComment.upVote >= 10 && dbComment.downVote >=10) {
// 	      	db.Busy.update({
// 	      	 	busy: 0,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }
// 	      else {
// 	      	db.Busy.update({
// 	      	 	busy: 0,
// 	      	 }, {
// 	      	 	where: db.Busy.comments_id
// 	      	 })
// 	      }


//     });
//   });




<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> 13b936e450c071b25639bd4bb745b211254f55d3
=======
module.exports = router




function prependComments(comments, objectName) {
  if (comments.length >= 5) {

        for (var i = comments.length - 1; i > comments.length - 6; i--) {
          objectName.push(comments[i])
        }

      }

      else if (comments.length === 4) {

        
        for (var i = comments.length - 1; i > comments.length - 5; i--) {
          objectName.push(comments[i])
        }

      }

      else if (comments.length === 3) {

        
        for (var i = comments.length - 1; i > comments.length - 4; i--) {
          objectName.push(comments[i])
        }

      }

      else if (comments.length === 2) {

        
        for (var i = comments.length - 1; i > comments.length - 3; i--) {
          objectName.push(comments[i])
        }

      }

      else if (comments.length === 1) {

        
        for (var i = comments.length - 1; i > comments.length - 2; i--) {
          objectName.push(comments[i])
        }

      }

      else {
        console.log("No Comments")
      }
}
>>>>>>> 66f33cfefe226447bbb6bdf5cfe94e2e2d0fa291
