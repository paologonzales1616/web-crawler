const mongoose = require("mongoose");

// Define schema for link model
const linksSchema = mongoose.Schema({
  title: String,
  description: String,
  link: String,
  withPdf: { type: Boolean, default: false }
  
});

//create the model for links and export
module.exports = mongoose.model("link", linksSchema);
