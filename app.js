const express = require('express');
const app = express();
const mongoose = require('mongoose');

const itemsRoutes = require('./api/routes/items');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://renting:' + process.env.MONGO_ATLAS_PW + '@renting-cluster-66sth.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB database!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/items', itemsRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});

module.exports = app;
