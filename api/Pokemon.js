const express = require('express');
const router = express.Router();
const Pokemons = require('../models/kantoregion');


router.get('/', (req, res) => {
    Pokemons.find({}, function(err, docs) {
        if (!err) { 
            console.log(docs);
        }
        else {
            throw err;
        }
    });
    res.send({'fata' : 'hi'});
});

module.exports = router;