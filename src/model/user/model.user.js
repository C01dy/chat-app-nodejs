const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  login: String,
  password: String,
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  avatar: String,
});

module.exports = model('User', userSchema);
