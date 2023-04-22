const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
