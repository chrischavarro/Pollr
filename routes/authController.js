const express = require('express');
const authController = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');

authController.get('/login', (req, res, next) => {
  res.render('auth/login');
});

authController.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

authController.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

authController.post('/signup', (req, res, next) => {
  const { username, passport } = req.body;

  if (username === "" || password === "") {
    res.render('auth/login', { error: 'You must enter a username and password!' })
  };

  User
    .findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        res.render('auth/signup', { error: 'An error occurred!' })
        return;
      }
      if (user) {
        res.render('auth/signup', { error: 'That username is already taken!' })
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save((err) => {
        if (err) {
          res.render('auth/signup', { error: 'An error occurred when signing up' })
        } else {
          res.redirect('/');
        }
      })
    });
});

module.exports = authController;
