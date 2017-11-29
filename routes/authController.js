const express = require("express");
const authController = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const passport = require("passport");

authController.get('/api/current_user', (req, res) => {
  res.send(req.user)
  console.log(req.user);
});

authController.get("/login", ensureLoggedOut('/surveys'), (req, res, next) => {
  res.render("auth/login");
});
//
// authController.post("/api/login", (req, res, next), passport.authenticate("local", (err, user, info) => {
//   if (err) { return next(err); }
//   if (!user) { return 'No user found'; }
//   req.logIn(user, function(err) {
//     if (err) { return next(err); }
//     return user;
//   })
//   })
// );

// authController.post('/api/login', (req, res, next) => {
//   const { username, password } = req.body;
//   console.log(req.body)
//   if (username === "" || password === "") {
//     console.log('Enter something!')
//   }
//
//   User.findOne({ username: username })
//     .exec((err, user) => {
//       if (err) {
//         console.log('An error occured logging in')
//         return;
//       }
//       if (!user) {
//         console.log("user doesn't exist!")
//         return;
//       }
//
//       if (bcrypt.compareSync(password, user.password)) {
//         req.user = user;
//         console.log(req.user);
//         res.redirect('/');
//       }
//     })
// })

authController.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
  })
);

authController.get("/signup", ensureLoggedOut('/surveys'), (req, res, next) => {
  res.render("auth/signup");
});

authController.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/login", {
      message: "You must enter a username and password!"
    });
  }

  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      res.render("auth/signup", { message: "An error occurred!" });
      return;
    }
    if (user) {
      res.render("auth/signup", { message: "That username is already taken!" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res.render("auth/signup", {
          error: "An error occurred when signing up"
        });
      } else {
        res.redirect("/surveys");
      }
    });
  });
});

module.exports = authController;
