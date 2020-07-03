const express = require('express');
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;


router.post('/', (req,res) => {
    var {username, email,password} = req.body;
    let salt = bcrypt.genSaltSync(rounds);
    password = bcrypt.hashSync(password,salt);
    console.log(password);
    var user = new Users({
        username,
        email,
        password,
    })

    user.save()
    .then(item => {
        res.send("item saved")
    }).catch(err => {
       res.send(err);
    })

});


module.exports = router;