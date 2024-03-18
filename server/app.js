const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config({ path: '.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(errorHandler);


app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);


app.use(express.static(path.join(__dirname, '../build/')));

app.get('*', (req, res) => {
  const filename = path.join(__dirname, '../build/index.html');
  res.sendFile(filename);
});

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  server.close(() => process.exit(1));
});
