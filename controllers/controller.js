//require dependencies
const express = require('express');
const router = express.Router();

var db = require("../models");

router.get('/', (req, res, next) => {
    res.render('index');
});
  

router.get("/:id", function(req, res) {
    
    db.comments.findAll({
    	where: {
    		place_id: req.params.id
    	}
    }).then(function(dbComments) {

      var allTheComments = {
        comments: []
      }
      
      

      for (var i = dbComments.length - 1; i > dbComments.length - 6; i--) {
          allTheComments.comments.push(dbComments[i])
      }

     
      res.render('index', allTheComments)
     
    });
  });


router.post("/:id", function(req, res) {

     
    db.comments.create({
      user: req.body.user,
      place_id: req.params.id,
      comment: req.body.comment
    }).then(function(results){
      console.log("This is the results ID: " + results.id)
      var commentId = results.id

    	// db.votes.create({
    	// 	user: req.body.user,
    	// 	comment_id: commentId
    	// });

    	// db.busy.create({
    	// 	comment_id: results.id
    	// });

     res.redirect(req.get('referer'));
    })
  })
  //   }).then(function(dbComment) {

  //     console.log(dbComment[0].comment_id)
  //     console.log(dbComment[1].comment_id)
      
  //     // res.render('index')
  //   });
  // });



router.delete("/:id", function(req, res) {
    
    db.Comments.destroy({
      where: {
      	id: req.body.id_comment,
        place_id: req.params.id
        // user: req.params.user
      }
    }).then(function(){
    	// db.Votes.destroy({
    	// 	where: {
    	// 		comment_id: db.Comments.id
    	// 	}
    	// })

    	// db.Busy.destroy({
    	// 	where: {
    	// 		comment_id: db.Comments.id
    	// 	}
    	// })

    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });



// app.put("/places/:place_id/:user", function(req, res) {

    
//     db.Comment.update({
//       comment: req.body.comment
//     }, {
//       where: {
//       	id: req.body.id,
//         place_id: req.params.place_id,
//         user: req.params.user
//       }
//     }).then(function(dbComment) {
//       res.json(dbComment);
//     });
//   });

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




module.exports = router