"use strict";
const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/all", (req, res, next) => {
  Post.find({}, (err, posts) => {
    let postMap = {};
    posts.forEach((post) => {
      postMap[user.id] = { email: user.email, _id: post.id, body: post.body, title: post.title };
    });
    res.render("post/index", { posts: postMap });
  });
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  // TODO get post id and show details of that post
  res.render("post/show");
});

router.get("/new", isLoggedIn, (req, res, next) => {
  // TODO create form for new post
  res.render("post/new");
});

router.post("/create", isLoggedIn, (req, res, next) => {
  // TODO actions for  new post creation
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
