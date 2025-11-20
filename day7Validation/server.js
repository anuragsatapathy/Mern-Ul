require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// parse JSON
app.use(express.json());

// routers 
const authRouter = require('./src/api/auth/auth.router');
const usersRouter = require('./src/api/users/users.router');

// mount routers
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// connect DB and start
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
