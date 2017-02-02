"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _author: {type: Schema.Types.ObjectId, ref: "User"}, // the type is Number because the _id of User is a Number
  title: {type: String, required: true},
  body: {type: String, required: true},
  date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Post", PostSchema);
