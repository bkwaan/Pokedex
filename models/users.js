const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    TempPassword: {
      type: Boolean,
      required: true
    },
    Session:{
      type:String,
      default: ""
    }
  },
  { collection: "Users" }
);

module.exports = User = mongoose.model("User", UserSchema);
