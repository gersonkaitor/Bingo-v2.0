const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// @desc Get a room
// @route GET /api/room
// @access Private
router.get('/', async (req, res) => {
  try {
    const room = await Room.find({ name: req.body.name });
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Room not found' });
    console.log(error);
  }
});

// @desc Create a room
// @route POST /api/room
// @access Private
router.post('/', async (req, res) => {
  let length = 30,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    randomPassword = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    randomPassword += charset.charAt(Math.floor(Math.random() * n));
  }

  const createRoom = new Room({
    name: req.body.name,
    password: randomPassword || req.body.password,
  });

  // Check data
  if (!createRoom.name) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  // Check for duplicate room name
  // const duplicateRoomName = await Room.findOne(createRoom.name);

  // if (duplicateRoomName) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: 'Room already created' });
  // }

  try {
    const saveRoom = await createRoom.save();
    res.json({ success: true, data: saveRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
    console.log(error);
  }
});

// @desc Update a room
// @route PUT /api/room
// @access Private
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          password: req.body.password || room.password,
        },
      },
      { new: true }
    );

    res.json({ success: true, data: updateRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
    console.log(error);
  }
});

// @desc Delete a room
// @route DELETE /api/room
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
    console.log(error);
  }
});

module.exports = router;
