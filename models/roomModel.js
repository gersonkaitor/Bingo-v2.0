const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  room: {
    type: String,
    required: [true, 'Please provide a room name on the field'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
