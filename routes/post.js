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
    res.send(postMap);
  });
});


module.exports = router;
