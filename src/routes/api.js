const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const withAuth = require("./auth");
const userModel = require("../component/models/schema");
const jwt = require("jsonwebtoken");
const secretkey = "secret";
router.get("/api/checkToken", withAuth, (req, res) => {
  res.sendStatus(200);
});
//post request

router.post(
  "/api/signup",
  // router.post("/signin", signInFunction);

  (req, res, next) => {
    const { body } = req;
    const { handle, email, password } = body;

    userModel
      .find({ email: email })
      .exec()
      .then(user => {
        if (user.length > 0) {
          res.json({
            message: "mail exists"
          });
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) {
                res.sendStatus(500).json({
                  error: "Error"
                });
              } else {
                userModel.create(
                  {
                    handle: handle,
                    email: email,
                    password: hash
                  },
                  (err, user) => {
                    if (err) {
                      res.json({
                        message: "There is a problem in registering user"
                      });
                    } else {
                      res.json({
                        message: "Successfully created new user"
                      });
                    }
                  }
                );
              }
            });
          });
        }
      });
  }
);

router.post("/api/signin", (req, res) => {
  const { body } = req;
  const { email, password } = body;
  userModel.findOne({ email: email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "incorrect mail and password"
      });
    } else {
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(401).json({
            error: "Unauthorized Access"
          });
        }
        if (result) {
          console.log("jwt");
          const users = {
            email: user.email
          };
          const token = jwt.sign({ users }, secretkey, { expiresIn: "1h" });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
        // res.status(401).json({
        //   error: "Unauthorized Access"
        // });
      });
    }
  });
});

module.exports = router;
