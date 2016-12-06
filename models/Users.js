var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  votes: Number,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}]

})

module.exports = mongoose.model('User', UserSchema)