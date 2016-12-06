var mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
  to: String,
  from: String,
  message: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', ChatSchema)