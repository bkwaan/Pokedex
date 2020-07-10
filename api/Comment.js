const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

//Posting a comment
router.post("/add", (req, res) => {
  var pokeName = req.body.pokeName;
  var comments = req.body.comments;
  var likes = req.body.likes;
  Comment.find({ pokeName: pokeName })
    .then((data) => {
      if (data.length > 0) {
        Comment.updateOne(
          { pokeName: pokeName },
          {
            $push: {
              comments: comments,
            },
          }
        ).then((data) => {
          res.send({
            success: true,
            message: "Comment posted",
          });
        });
      } else {
        var newComment = new Comment({
          pokeName,
          comments,
          likes,
        });

        newComment
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "Comment Posted!!",
            });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

// Adding a like to a comment
router.post("/addLike", (req, res) => {
  let id = req.body.id;
  let pokeName = req.body.pokeName;
  Comment.updateOne(
    { pokeName: pokeName, "comments._id": id },
    { $inc: { "comments.$.likes": 1 } }
  )
    .then((data) => {
      res.send({
        success: true,
        message: "Likes updated",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
