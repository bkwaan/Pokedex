const express = require("express");
const router = express.Router();

const Pokemon = require("./Pokemon.js");

router.use("/", Pokemon);


module.exports = router;