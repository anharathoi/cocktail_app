const express = require('express');
const router = express.Router();
const User = require('../models/User.model')

// post to register

router.post('/register', (req,res) => {
  const {firstName, lastName, email, password, phone, deliveryAddress, admin, dateJoined, numberOfOrders, active} = req.body;
    User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      deliveryAddress,
      admin,
      dateJoined,
      numberOfOrders,
      active
    })
    .then( user => {
      res.send(user)
    })
    .catch( err => {
      res.status(400).send(err)
    })
  })

// post to login
router.post('/login', (req,res) => {
  
})


module.exports = router;