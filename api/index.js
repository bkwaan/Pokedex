const express = require("express");
const router = express.Router();

const Pokemon = require("./Pokemon.js");

router.use("/Pokemon", Pokemon);

console.log("Testing");

module.exports = router;