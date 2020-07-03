const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;

router.post("/Signup", (req, res) => {
  var { username, email, password } = req.body;
  let salt = bcrypt.genSaltSync(rounds);
  password = bcrypt.hashSync(password, salt);
  var user = new Users({
    username,
    email,
    password,
  });

  user.save()
    .then((data) => {
      res.send({success:true, message: 'User saved'})
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/Login", (req, res) => {
  var { email, password } = req.body;
  Users.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        if (bcrypt.compareSync(password, data[0].password)) {
          res.json({ success: true, message: "Logged in" });
        } else {
            res.json({status:404, success: false, message: 'Incorrect Password'});
        }
      } else {
          res.json({status: 404, success: false, message: 'Email is not registered'});
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
