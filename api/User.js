const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25, //SMTP port
  auth: {
    user: "pepeinccs@gmail.com",
    pass: "Comp4945",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get("/:email", (req, res) => {
  var email = req.params.email;
  console.log(email);
  Users.find({ Email: email }).then((data) => {
    if (data.length > 0) {
      let emailSend = {
        from: "Pokedex <pepeincss@gmail.com>",
        to: email,
        subject: "HELLO",
        text: "http://localhost5000/api/User/forgotPassword",
      };

      transporter.sendMail(emailSend, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });
      res.send({
        success: true,
        message: "Sent reset email!",
      });
    } else {
      res.send({
        success: false,
        message: "Email doesn't exist",
      });
    }
  });
});

router.post("/forgotPassword/:user", (req, res) => {
  var email = req.params.user;
  var password = req.body.password;
  console.log(email);
  let salt = bcrypt.genSaltSync(rounds);
  password = bcrypt.hashSync(password, salt);
  Users.updateOne(
    { Email: email },
    {
      Password: password,
    }
  )
    .then((data) => {
      res.send({
        success: true,
        message: "Password Updated!",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Signup users
router.post("/Signup", (req, res) => {
  var { Username, Email, Password } = req.body;
  let salt = bcrypt.genSaltSync(rounds);
  Password = bcrypt.hashSync(Password, salt);

  Users.find({ Email: Email })
    .then((data) => {
      if (data.length > 0) {
        res.send({
          success: false,
          message: "Email already exists",
        });
      } else {
        var user = new Users({
          Username,
          Email,
          Password,
        });

        user
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "User saved",
            });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/Login", (req, res) => {
  var { Username, Password } = req.body;
  Users.find({ Email: Username })
    .then((data) => {
      if (data.length > 0) {
        if (bcrypt.compareSync(Password, data[0].password)) {
          console.log("LOGGED IN BABY");
          res.send({
            success: true,
            message: "Logged in",
          });
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
