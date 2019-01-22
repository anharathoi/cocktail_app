const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport') 
//maybe we need to add passport to app.use passport


// post to register

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        };
        User.findOneAndUpdate({
          email: user.email
        })
        .then(user => {
          user
          .update({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          })
          .then(() => {
            console.log('user created in db');
            res.status(200).send({message: 'user created' });
          })
        })
      })
    }
  })(req, res, next);
})
// router.post('/register', (req,res) => {
//   const {firstName, lastName, email, password, phone, deliveryAddress, admin, dateJoined, numberOfOrders, active} = req.body;
//     User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//       phone,
//       deliveryAddress,
//       admin,
//       dateJoined,
//       numberOfOrders,
//       active
//     })
//     .then( user => {
//       res.send(user)
//     })
//     .catch( err => {
//       res.status(400).send(err)
//     })
//   })

// post to login
router.post('/login', (req,res) => {
  
})



module.exports = router;