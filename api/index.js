const { Router } = require("express");

const express = require("express");
const router = express.Router();

const Pokemon = require("./Pokemon.js");

router.use("/pokemon",Pokemon);


module.exports = router;