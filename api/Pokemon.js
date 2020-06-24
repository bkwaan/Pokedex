const express = require('express');
const router = express.Router();
const Pokemons = require('../models/kantoregion');

// Get all pokemons
router.get('/', (req, res) => {
    // Pokemons.find({}, function(err, docs) {
    //     if (!err) { 
    //         console.log(docs);
    //     }
    //     else {
    //         throw err;
    //     }
    // }).project;
    // res.send({'fata' : 'hi'});
    Pokemons.find({}, { _id: 0, id: 1, name: 1, type: 1 })
    .sort({id: 1})
    .then((data) => {
        //console.log(data);
        res.send(data);
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/:id', (req, res) => {
    let pokeid = parseInt(req.params.id);
    Pokemons.find({ id: pokeid})
    .then((data) => {
        if (data.length > 0) {
            res.send(data[0]);
        } else
        console.log(data);
        
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;