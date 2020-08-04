const express = require("express");
const router = express.Router();
const Pokemons = require("../models/kantoregion");

// Get all pokemons
router.get("/", (req, res) => {
  Pokemons.find({}, { _id: 0, id: 1, name: 1, type: 1})
    .sort({ id: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  let pokeid = parseInt(req.params.id);
  Pokemons.find({ id: pokeid })
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } 
    })
    .catch((err) => {
      console.log(err);
    });
});


//Search Function
router.get("/name/:name", (req, res) => {
    let pokeName = req.params.name;
    Pokemons.find({ 'name.english': {$regex: new RegExp("^" + pokeName.toLowerCase(), "i")} })
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } else console.log(data);
    console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/typeFilter/:type", (req, res) => {
    Pokemons.find({type: req.params.type}, { _id: 0, id: 1, name: 1})
    .sort({ id: 1 })
    .then((data) => {
        if (data.length > 0) {
          res.send(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
})

module.exports = router;
