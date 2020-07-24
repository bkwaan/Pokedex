const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    pokeName: String,
    comments: [{username: String, post: String, date: Date, likes: [{username: String}]}],
  },
  { collection: "Comments" }
);

module.exports = comment = mongoose.model("comment", commentSchema);
