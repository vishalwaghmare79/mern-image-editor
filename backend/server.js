const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const { connectDB } = require('./config/db');
require('dotenv').config();
const path = require('path');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

connectDB()

// Serve images statically from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running...');
  });

app.use('/api/auth', authRoutes);
app.use('/api', imageRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
});

app.use(errorMiddleware);