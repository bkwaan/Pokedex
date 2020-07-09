const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

//Posting a comment
router.post("/add", (req, res) => {
  var pokeName = req.body.pokeName;
  var comments = req.body.comments;
  Comment.find({ pokeName: pokeName })
    .then((data) => {
      if (data.length > 0) {
        Comment.update(
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

module.exports = router;
