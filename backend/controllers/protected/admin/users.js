const express = require('express');
const User = require('../../../models/User.model')
const router = express.Router();
const passport = require('passport');

// Passport Config
require('../../../config/passport')(passport);

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

// get customer-info -ADMIN
router.get('/admin/users',passport.authenticate('jwt', {session: false}), (req,res) => {
  User.find({})
  .then(customers => {
    if(req.user.admin){
      res.send({customers, admin:req.user.admin});
    } else {
      return res.status(403).send("Admin privileges required")
    }
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

/**
|--------------------------------------------------
| GET INDIVIDUAL CUSTOMER FOR ADMIN 
|--------------------------------------------------
*/

router.get('/admin/users/:firstName', (req, res) => {
  const {firstName} = req.params;
  // const {password} = req.headers;
  console.log(`37 - users.controller.js - list an individual customer for admin  ${req.params}`)

  User.findOne({firstName})
  .then( user => {
    res.send(user);
  })
})

// put user profile

// get transaction history

module.exports = router;