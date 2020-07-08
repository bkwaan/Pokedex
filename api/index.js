const express = require("express");
const router = express.Router();

const Pokemon = require("./Pokemon.js");
const User = require("./User.js")

router.use("/Pokemon", Pokemon);

router.use("/User", User);

module.exports = router;