const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');

// /**
// |--------------------------------------------------
// | UPDATE USER PERSONAL DETAILS AND ADDRESS
// |--------------------------------------------------
// */

router.put('/update-details', (req,res) => {
  const { firstName, lastName, streetAddress, suburb, postcode, ausState, error, message, email } = req.params
  // console.log(req.body)
  // console.log(req.body.firstName)
  // console.log(req.body.email)
  // res.send({ status: 'SUCCESS' });
  

  User.findOneAndUpdate({ email: { $eq: req.body.email}}, {$set: {
      firstName: req.body.firstName, 
      lastName: req.body.lastName,  
      streetAddress: req.body.streetAddress, 
      suburb: req.body.suburb, 
      postcode: req.body.postcode, 
      ausState: req.body.ausState  
  }}, {upsert: true},
  function(err){
    // if (err) console.log(`24 - userDetails.controller.js - updated user personal info ${err}`);
  })
})

module.exports = router