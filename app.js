const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require('passport');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const flash = require('connect-flash')
const session = require('express-session');
const pollController = require("./routes/pollController");
const authController = require("./routes/authController");

require('./services/passport');
const app = express();

mongoose.connect("mongodb://localhost/voting-app");

app.use(session({
  secret: 'passport-voting-app',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/", authController);
app.use("/polls", pollController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("Voting server listening");
});

module.exports = app;
