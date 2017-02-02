"use strict";
const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const csrfProtection = csrf();
router.use(csrfProtection);

const Post = require("../models/post");
const User = require("../models/user");
/*
  * Logged In
*/
router.get('/profile', isLoggedIn, (req, res, next) => {
  Post.find({_author: req.user._id}, (err, posts) => {
    if (err) {
      req.flash("error", err);
      return res.redirect("/");
    }
    let postMap = [];
    posts.forEach((p) => {
      postMap.push({ id: p.id, body: p.body, title: p.title, user: req.user });
    });
    res.render("user/profile", {posts: postMap, user: req.user});
  });
});

// Edit/Delete
router.get("/edit", isLoggedIn, (req, res, next) => {
  res.render("user/edit", {user: req.user, csrfToken: req.csrfToken()});
});

router.post("/:id/delete", isLoggedIn, (req, res, next) => {
  User.findOneAndRemove({_id: req.params.id}, (result) => {
    if (err) {
      req.flash(err);
      return res.redirect("/user/edit");
    }
    req.flash("success", "Your profile has been deleted.");
    req.logout();
    return res.redirect("/");
  });
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect("/");
});

/*
  * Not Logged In
*/

// Sign Up
router.get('/signup', isNotLoggedIn, (req, res, next) => {
  const messages = req.flash("error");
  res.render("user/signup", {csrfToken: req.csrfToken(), title: "Blog", messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate("local.signup", {
  successRedirect: "/user/profile",
  failureRedirect: "/user/signup",
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect("/user/profile");
  }
});

// Sign In
router.get('/signin', isNotLoggedIn, (req, res, next) => {
  const messages = req.flash("error");
  res.render("user/signin", {csrfToken: req.csrfToken(), title: "Blog", messages: messages, hasErrors: messages.length > 0});
});

router.post("/signin", passport.authenticate("local.signin", {
  failureRedirect: "/user/profile",
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect("/user/profile");
  }
});

router.use("/", isNotLoggedIn, (req, res, next) => {
  next();
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
