const express = require('express');
const User = require('../../../models/User.model')
const router = express.Router();

// get customer-info -ADMIN
router.get('/admin/users', (req,res) => {
  User.find({})
  .then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

// maybe post/get for transaction depending on what stripe does - Anhar thinks so!

// get active customers
//////////////// all users ////////////

// get profile - customer
router.get('/admin/users/:firstName', (req, res) => {
  const {firstName} = req.params;
  // const {password} = req.headers;
  User.findOne({firstName})
  .then( user => {
    res.send(user);
  })
})

// put user profile

// get transaction history

module.exports = router;