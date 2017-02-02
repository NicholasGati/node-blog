"use strict";
// https://devcenter.heroku.com/articles/s3-upload-node#uploading-directly-to-s3
const express = require("express");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: `public/tmp`,
  limits: {fileSize: 1000000, files: 1},
});

const Post = require("../models/post");
const User = require("../models/user");

router.get("/all", (req, res, next) => {
  Post.find({}, (err, posts) => {
    let postMap = {};
    posts.forEach((post) => {
      postMap[user.id] = { email: user.email, _id: post.id, body: post.body, title: post.title };
    });
    res.render("post/index", { posts: postMap });
  });
});

router.get("/:id/show", isLoggedIn, (req, res, next) => {
  if (req.params.id) {
    Post.findOne({_id: req.params.id}).exec().then((post) => {
      User.findOne({_id: post._author}, (err, user) => {
        res.render("post/show", {imgPath: post.imagePath, post: post, author: `${user.fname} ${user.lname}`, isImage: post.imagePath != null});
      });
    });
  } else if (req.session.current_post) {
    Post.findOne({_id: req.params.id}).exec().then((post) => {
      User.findOne({_id: post._author}, (err, user) => {
        req.session.current_post = null;
        res.render("post/show", {imgPath: post.imagePath, post: post, author: `${user.fname} ${user.lname}`, isImage: post.imagePath != null});
      });
    });
  } else {
    res.render("post/show");
  }
});

router.get("/new", isLoggedIn, (req, res, next) => {
  res.render("post/new", {user: req.user});
});

router.post("/create", upload.single("image"), (req, res, next) => {
  // Create a new post with form data
  const newPost = new Post();
  newPost.title = req.body.title;
  newPost.body = req.body.postBody;
  newPost._author = req.user.id;
  if (req.file) {
    const filename = (new Date).valueOf() + "-" + req.file.originalname;
    newPost.imagePath = `http://localhost:3000/tmp/${req.file.filename}`;
    newPost.imageId = req.file.filename;
  } else {
    newPost.imagePath = null;
    newPost.imageId = null;
  }

  // Save the post
  newPost.save((err, post) => {
    if (err) {
      req.flash(err);
      return res.redirect("/post/new");
    }
    req.session.current_post = post.id;
    return res.redirect(`/post/${post.id}/show`);
  });
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
