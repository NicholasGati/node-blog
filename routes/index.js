"use strict";
const express = require('express');
const router = express.Router();

const Post = require("../models/post");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Blog Posts' });
  // Post.find({}, (err, posts) => {
  //   let postMap = {};
  //   posts.forEach((p) => {
  //     postMap[user.id] = { email: user.email, _id: p.id, body: p.body, title: p.title };
  //   });
  //   res.render('index', { title: 'Blog' , posts: postMap});
  // });
});

module.exports = router;
