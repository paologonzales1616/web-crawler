const mongoose = require("mongoose");

// Define schema for user model
const userSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  created_date: { type: Date, default: Date.now() },
  updated_date: { type: Date, default: Date.now() },
  updated_password: { type: Boolean, default: false }
});

//create the model for users and export
module.exports = mongoose.model("user", userSchema);
