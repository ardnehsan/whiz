//require dependencies
const express = require('express');
const router = express.Router();

var db = require("../models");


  
router.get("/", function(req, res) {
    console.log(req.body.placeId);
    db.comments.findAll({
    	where: {
    		place_id: req.body.placeId
    	}
    }).then(function(dbComments) {

      // res.render("index", { comments: dbComments });
      res.render('index', dbComments)
      res.json(dbComments);
      console.log(dbComments)
      
    });
  });

  router.post("/places/:place_id/:user", function(req, res) {
     
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


  router.delete("/places/:place_id/:user", function(req, res) {
    
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



  router.put("/places/:place_id/:user", function(req, res) {
    
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




module.exports = router