const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');
const User = require('../models/userModels');

const users = [
  {
    id: 1,
    username: 'John',
    isAdmin: true,
  },
  {
    id: 2,
    username: 'Sara',
    isAdmin: false,
  },
  {
    id: 3,
    username: 'Judy',
    isAdmin: false,
  },
];

const rooms = [
  {
    id: 1,
    user: [1],
    room: 'Room 1',
    password: 'room123',
  },
  {
    id: 2,
    room: 'Room 2',
    user: 2,
    password: 'room123',
  },
  {
    id: 3,
    user: 3,
    room: 'Room 1',
    password: 'room123',
  },
];

router.get('/', (req, res) => {
  const room = rooms.find((room) => room.id === +req.params.roomId);

  if (!room) {
    res.status(404).json({ success: false, error: 'Resource not found' });
  }

  const roomsWithUser = rooms.map((room) => {
    if (room.user === users.id) {
      return res.json({ success: true, data: { rooms, user: users.username } });
    }
  });

  // res.json({ success: true, data: { rooms, users } });
  res.json({ roomsWithUser });
});

module.exports = router;
