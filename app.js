const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const keys = require('./config/keys');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require('connect-flash')
const session = require('express-session');
const pollController = require("./routes/pollController");
const authController = require("./routes/authController");

require('./services/passport');
const app = express();

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(keys.mongoURI)
} else {
  mongoose.connect("mongodb://localhost/voting-app");
}

app.use(session({
  secret: 'passport-voting-app',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authController);
app.use("/", pollController);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // Like our main.js file or main.css file
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  // If it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port);

module.exports = app;
