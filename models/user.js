"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  _id: Number,
  fname: String,
  lname: String,
  email: {type: String, required: true},
  passwword: {type: String, required: true},
  date_created: {type: Date, default: Date.now},
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);
