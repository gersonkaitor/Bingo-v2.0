const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BINGO API' });
});

const roomRouter = require('./routes/roomRoutes');
app.use('/api/room', roomRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
