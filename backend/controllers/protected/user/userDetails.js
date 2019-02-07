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
<<<<<<< HEAD
  // console.log(req.body)
  // console.log(req.body.firstName)
  // console.log(req.body.email)
  // res.send({ status: 'SUCCESS' });
  
=======
  // console.log(`13 - userDetails.controller.js - update user personal info ${req.body}`)
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b

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