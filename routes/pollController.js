const express = require("express");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const pollController = express.Router();

pollController.get("/", ensureLoggedIn('/login'), (req, res) => {
  res.render("polls/index");
  console.log(req.user)
});

module.exports = pollController;
