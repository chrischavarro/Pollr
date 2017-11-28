const express = require("express");
const authController = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const passport = require("passport");

authController.get("/login", ensureLoggedOut('/surveys'), (req, res, next) => {
  res.render("auth/login");
});

authController.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/polls",
    failureRedirect: "/login",
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
