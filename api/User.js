const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;

router.post("/Signup", (req, res) => {
  var { username, email, password } = req.body;
  let salt = bcrypt.genSaltSync(rounds);
  password = bcrypt.hashSync(password, salt);

  Users.find({ email: email })
    .then((data) => {
      if (data.length > 0) {
        res.send({ 
          success: false, 
          message: "Email already exists" });
      }
    })
    .catch((err) => {
      res.send(err);
    });

  var user = new Users({
    username,
    email,
    password,
  });

  user
    .save()
    .then((data) => {
      res.send({ 
        success: true, 
        message: "User saved" });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/Login", (req, res) => {
  var { Username, Password } = req.body;
  console.log(Username)
  console.log(Password)
  Users.find({ email: Username })
    .then((data) => {
      if (data.length > 0) {
        if (bcrypt.compareSync(Password, data[0].password)) {
          console.log("LOGGED IN BABY");
          res.send({ 
            success: true, 
            message: "Logged in" });
        } else {
          res.send({
            status: 404,
            success: false,
            message: "Incorrect Password",
          });
        }
      } else {
        res.send({
          status: 404,
          success: false,
          message: "Email is not registered",
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
