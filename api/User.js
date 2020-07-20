const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
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

router.post("/resetPassword", (req, res) => {
  var email = req.body;
  var password = Math.random().toString(36).slice(-8);
  console.log(email);
  let salt = bcrypt.genSaltSync(rounds);
  password = bcrypt.hashSync(password, salt);

  Users.find({ Email: email }).then((data) => {
    if (data.length > 0) {
      let emailSend = {
        from: "Pokedex <pepeincss@gmail.com>",
        to: email,
        subject: "HELLO",
        text: "Hello there your temporary password is " + password,
      };

      transporter.sendMail(emailSend, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });

      Users.updateOne(
        { Email: email },
        {
          Password: password,
          TempPassword: true,
        }
      )
        .then((data) => {
          res.send({
            success: true,
            message: "Password Updated and email sent!",
          });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send({
        success: false,
        message: "Email doesn't exist",
      });
    }
  });
});

router.post("/forgotPassword", (req, res) => {
  var { email, password } = req.body;
  console.log(email);
  let salt = bcrypt.genSaltSync(rounds);
  password = bcrypt.hashSync(password, salt);
  Users.updateOne(
    { Email: email },
    {
      Password: password,
      TempPassword: false,
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
          TempPassword: false,
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
