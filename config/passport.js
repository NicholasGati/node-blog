"use strict";
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// Serialize the User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the User
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// passport local.signup
passport.use("local.signup", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  // Validate
  req.checkBody("email", "Invalid Email").notEmpty().isEmail();
  req.checkBody("password", "Invalid Password").notEmpty().isLength({min:4});
  const errors = req.validationErrors();

  if (errors) {
    let messages = [];
    errors.forEach((err) => {
      messages.push(err.msg);
    });
    return done(null, false, req.flash("error", messages));
  }

  User.findOne({"email": email}, (err, user) => {
    if (err) {
      return done(err);
    }

    // if this user already exists
    if (user) {
      return done(null, false, {messages: "Email is already in use."});
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);

    newUser.save((err, result) => {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

// passport local.signin
passport.use("local.signin", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  // Validate
  req.checkBody("email", "Invalid Email").notEmpty().isEmail();
  req.checkBody("password", "Invalid Password").notEmpty().isLength({min:4});
  const errors = req.validationErrors();

  if (errors) {
    let messages = [];
    errors.forEach((err) => {
      messages.push(err.msg);
    });
    return done(null, false, req.flash("error", messages));
  }

  User.findOne({"email": email}, (err, user) => {
    if (err) {
      return done(err);
    }

    // if this user already exists
    if (!user) {
      return done(null, false, {messages: "No user found."});
    }

    if (!user.validPassword(password)) {
      return done(null, false, {message: "Invalid Password!"});
    }

    return done(null, user);
  });
}));
