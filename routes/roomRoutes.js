const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

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
    userId: 1,
    room: 'Room 1',
    password: 'room123',
  },
  {
    id: 2,
    room: 'Room 2',
    userId: 2,
    password: 'room123',
  },
  {
    id: 3,
    userId: 3,
    room: 'Room 3',
    password: 'room123',
  },
];

// @desc Get a room
// @route GET /api/room
// @access Private
router.get('/', (req, res) => {
  const room = rooms.find((room) => room.room === req.body.room);

  if (!room) {
    res.status(404).json({ success: false, error: 'Room not found' });
  }

  res.json({ success: true, data: room });
});

// @desc Create a room
// @route POST /api/room
// @access Private
router.post('/', (req, res) => {
  let length = 30,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    randomPassword = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    randomPassword += charset.charAt(Math.floor(Math.random() * n));
  }

  const createRoom = {
    id: rooms.length + 1,
    room: req.body.room,
    password: randomPassword || req.body.password,
    date: new Date().toISOString().slice(0, 10),
  };

  // Check data
  if (!createRoom.room || !createRoom.password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }
  rooms.push(createRoom);

  const room = rooms.find((room) => createRoom.id === room.id);
  res.json({ success: true, data: room });
});

// @desc Update a room
// @route PUT /api/room
// @access Private
router.put('/:id', (req, res) => {
  const room = rooms.find((room) => room.id === +req.params.id);

  if (!room) {
    res.status(404).json({ success: false, error: 'Room not found' });
  }

  room.room = req.body.room || room.room;
  room.password = req.body.password || room.password;

  res.json({ success: true, data: room });
});

// @desc Delete a room
// @route DELETE /api/room
// @access Private
router.delete('/:id', (req, res) => {
  const room = rooms.find((room) => room.id === +req.params.id);

  if (!room) {
    res.status(404).json({ success: false, error: 'Room not found' });
  }

  const index = rooms.indexOf(room);
  rooms.splice(index, 1);

  res.json({ success: true, data: {} });
});

module.exports = router;
