const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const rounds = 10;
const nodemailer = require("nodemailer");
const { reset } = require("nodemon");

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
  var Email = req.body.Email;
  var password = Math.random().toString(36).slice(-8);
  console.log(Email);

  Users.find({ Email: Email }).then((data) => {
    if (data.length > 0) {
      let emailSend = {
        from: "Pokedex <pepeincss@gmail.com>",
        to: Email,
        subject: "Temporary Password",
        text: "Hello there your temporary password is " + password,
      };

      transporter.sendMail(emailSend, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });

      let salt = bcrypt.genSaltSync(rounds);
      password = bcrypt.hashSync(password, salt);

      Users.updateOne(
        { Email: Email },
        {
          Password: password,
          TempPassword: true,
        }
      )
        .then((data) => {
          res.send({
            success: true,
            message: "Password Sent, Please check your email",
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

  Users.find({
    $or: [
      {
        Email: Email,
      },
      { Username: Username },
    ],
  })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        if (data[0].Email === Email) {
          res.send({
            success: false,
            message: "Email already exists",
          });
        } else {
          res.send({
            success: false,
            message: "Username already exists",
          });
        }
      } else {
        var user = new Users({
          Username,
          Email,
          Password,
          TempPassword: false,
          Session: "",
        });

        user
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "User Registered",
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
  var { Username, Password, Session } = req.body;
  Users.find({ Email: Username })
    .then((data) => {
      if (data.length > 0) {
        if (bcrypt.compareSync(Password, data[0].Password)) {
          User.updateOne({ Username: Username }, { Session: Session })
            .then((data) => {
              console.log("Updated");
            })
            .catch((err) => {
              res.send(err);
            });
          const userInfo = {
            id: data[0]._id,
            userName: data[0].Username,
            email: data[0].Email,
          };
          res.send({
            success: true,
            message: "Logged in",
            userInfo: userInfo,
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


// Gets username based on session variable
router.get("/Session/:name", (req, res) => {
  var Session = req.params.session;
  User.find({Session: Session})
  .then((data) => {
    if (data.length > 0) {
      res
        .send({
          success: true,
          User: data[0].Username,
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.sennd({
        success: false,
        User: ""
      })
    }
  });
});

module.exports = router;
