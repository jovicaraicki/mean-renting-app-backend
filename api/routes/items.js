const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/item');

router.get('/', (req, res, next) => {
  Item.find()
    .exec()
    .then(docs => {
      // console.log(docs);
      res.status(200).json({
        items: docs
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});

router.get('/edit/:id', (req, res, next) => {
  Item.findById(req.params.id).then(post => {
    if (post) {
      // console.log(post);
      // console.log(post._id);
      res.status(200).json({
        id: post._id,
        item: post
      });
    } else {
      res.status(404).json({message:'Post not found!'})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching post failed!'
    })
  });
});

router.post('/', (req, res, next) => {
  console.log('req: ' + req.body.availableFrom);
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    sqm: req.body.sqm,
    surface: req.body.surface,
    price: req.body.price,
    imagePath: req.body.imagePath,
    city: req.body.city,
    cityArea: req.body.cityArea,
    areaCode: req.body.areaCode,
    street: req.body.street,
    zipCode: req.body.zipCode,
    floor: req.body.floor,
    furnished: req.body.furnished,
    rooms: req.body.rooms,
    bedrooms: req.body.bedrooms,
    beds: req.body.beds,
    bathrooms: req.body.bathrooms,
    heating: req.body.heating,
    balcony: req.body.balcony,
    duplex: req.body.duplex,
    loftApartment: req.body.loftApartment,
    penthouse: req.body.penthouse,
    lastFloor: req.body.lastFloor,
    description: req.body.description,
    deposit: req.body.deposit,
    availableFrom: req.body.availableFrom,
    cooling: req.body.cooling,
    internet: req.body.internet,
    cableTv: req.body.cableTv,
    phone: req.body.phone,
    washingMachine: req.body.washingMachine,
    dishWasher: req.body.dishWasher,
    floorHeating: req.body.floorHeating,
    pantry: req.body.pantry,
    lift: req.body.lift,
    basement: req.body.basement,
    intercom: req.body.intercom,
    videoSurv: req.body.videoSurv,
    garage: req.body.garage,
    parkingPlace: req.body.parkingPlace,
    garden: req.body.garden,
    pool: req.body.pool,
    creator: 'user',
    date: Date.now()
  });
  item.save()
    .then(createdItem => {
      res.status(201).json({
        message: 'Handling POST requests to /item',
        post: createdItem
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  const updateObject = req.body;
  Item.updateOne({ _id: id }, { $set: updateObject })
      .exec()
      .then(result => {
          console.log(result);
          res.status(200).json(result);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
});

module.exports = router;
