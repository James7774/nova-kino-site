const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/movies', movieRoutes);
  app.use('/api/users', userRoutes);

  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  try {
    await connectDB();
  } catch (err) {
    console.error('DB Connection failed:', err.message);
  }
};

startServer();
