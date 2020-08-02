const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Getting the comments
router.get("/:name", (req, res) => {
  var name = req.params.name;
  console.log(name);
  Comment.find({ pokeName: name })
    .then((data) => {
      if (data.length > 0) {
        res.send({ exist: true, comments: data[0].comments });
      } else {
        res.send({ exist: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//Posting a comment
router.post("/add", (req, res) => {
  var {pokeName, comments} = req.body;
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
  var { id, pokeName, username } = req.body;
  console.log(id, pokeName, username);
  // Comment.find({
  //   pokeName: pokeName,
  //   "comments._id": id,
  //   "comments.likes.username": username,
  // }).then((data) => {
  //   if (data.length > 0) {
  //     res.send({
  //       success: false,
  //       message: "User has already liked the comment",
  //     });
  //   } else {
  //     console.log("HELLO");
      Comment.updateOne(
        { pokeName: pokeName, "comments._id": id },
        {
          $push: {
            "comments.$.likes": { username: username },
          },
        }
      )
        .then((data) => {
          res.send({
            message: "comment liked",
            success: true,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    // }
  // });
});

// Unliking a comment
router.post("/unlike", (req, res) => {
  var { id, pokeName, username } = req.body;
  console.log(id, pokeName, username);
  Comment.findOneAndRemove(
    { pokeName: pokeName, "comments._id": id, "comments.likes.username": username },
  )
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Comment unliked",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Deleting a comment
router.post("/delete", (req, res) => {
  var { id, pokeName } = req.body;
  Comment.updateOne(
    { pokeName: pokeName },
    { $pull: { comments: { _id: id } } }
  )
    .then((data) => {
      res.send({
        success: true,
        message: "Comment deleted",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Editing a post
router.post("/editPost", (req, res) => {
  var { id, pokeName, post } = req.body;
  Comment.updateOne(
    { pokeName: pokeName, "comments._id": id },
    {
      "comments.$.post": post,
    }
  )
    .then((data) => {
      res.send({
        success: true,
        message: "Comment updated",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

/*Like Comment Conditional statement */
router.get("/likes/:id/:pokeName/:username", (req, res) => {
  var { pokeName, id, username } = req.params;
  console.log(pokeName);
  console.log(id);
  console.log(username);
  console.log("------------");
  Comment.find({
    pokeName: pokeName,
    "comments._id": id,
    "comments.likes.username": username,
  })
    .then((data) => {
      console.log(data.length);
      if (data.length > 0) {
        res.send({
          success: true,
          message: "User has liked the comment",
        });
      } else {
        res.send({
          success: false,
          message: "User has not liked the comment",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
