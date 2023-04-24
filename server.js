const express = require('express');

const PORT = 5000;

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
