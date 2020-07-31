const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    pokeName: { type: String, required: true },
    comments: [
      {
        username: { type: String, required: true },
        post: { type: String, required: true },
        date: { type: Date, required: true },
        likes: [{ username: { type: String} }],
      },
    ],
  },
  { collection: "Comments" }
);

module.exports = comment = mongoose.model("comment", commentSchema);
