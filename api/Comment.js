const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Getting the comments
router.get("/:name", (req, res) => {
  let name = req.params.name;
  console.log(name);
  Comment.find({ "pokeName": name })
    .then((data) => {
      if (data.length > 0) {
        res.send({ exist: true, comments: data[0].comments});
      } else {
        res.send({ exist: false });
      }
    }).catch((err) => {
      console.log(err);
    })
})

//Posting a comment 
router.post("/add", (req, res) => {
  var pokeName = req.body.pokeName;
  var comments = req.body.comments;
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
  let id = req.body.id;
  let pokeName = req.body.pokeName;
  Comment.updateOne(
    { pokeName: pokeName, "comments._id": id },
    { $inc: { "comments.$.likes": 1 } }
  )
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Likes updated",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Adding a dislike to a comment
router.post("/dislike", (req, res) => {
  let id = req.body.id;
  let pokeName = req.body.pokeName;
  Comment.updateOne(
    { pokeName: pokeName, "comments._id": id },
    { $inc: { "comments.$.likes": -1 } }
  )
    .then((data) => {
      console.log(data);
      res.send({
        success: true,
        message: "Comment disliked",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Deleting a comment
router.post("/delete", (req, res) => {
  let id = req.body.id;
  let pokeName = req.body.pokeName;
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
  let id = req.body.id;
  let pokeName = req.body.pokeName;
  let post = req.body.post;
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

router.get("/likes/:id/:pokeName", (req,res) => {
  let pokeName = req.params.pokeName;
  let id = req.params.id;
  Comment.find(
    { pokeName: pokeName, "comments._id" : id}
  ).then((data) => {
    if(data.length > 0) {
      res.send(data[0].comments[0]);
    }
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
