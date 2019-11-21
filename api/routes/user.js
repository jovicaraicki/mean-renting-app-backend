const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /users'
  });
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        agency: req.body.agency,
        agencyReg: req.body.agencyReg
      });
      user.save()
      .then(createdUser => {
        res.status(201).json({
          message: 'User created!',
          post: createdUser
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      })
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log('user: ', user);
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      // console.log('result: ', result);
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
});

module.exports = router;
