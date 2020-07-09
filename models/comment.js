const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    pokeName: String,
    comments: [{username: String, post: String, date: Date }],
  },
  { collection: "Comments" }
);

module.exports = comment = mongoose.model("comment", commentSchema);
