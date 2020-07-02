const express = require('express');
const router = express.Router();
const Users = require("../models/users");

router.post('/', (req,res) => {
    const {username, email,password} = req.body;
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