const { Schema, model, default: mongoose } = require('mongoose');

const authTokenSchema = new Schema({
  token: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('AuthToken', authTokenSchema);
