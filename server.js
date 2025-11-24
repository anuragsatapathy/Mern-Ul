require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/middlewares/logger');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(logger);

// Mount routers
app.use('/api/tasks', require('./src/api/task/task.router'));
app.use('/api/aggregations', require('./src/api/task/aggregate.router'));
app.use('/api/students', require('./src/api/student/student.router'));

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// global error handler (must be last)
app.use(errorMiddleware);

// DB connect & start server
const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error', err);
    process.exit(1);
  });
