const express = require("express");
const router = express.Router();

const Pokemon = require("./Pokemon.js");
const User = require("./User.js");
const Comment = require("./Comment.js");

router.use("/Pokemon", Pokemon);

router.use("/User", User);

router.use("/Comment", Comment);

module.exports = router;
