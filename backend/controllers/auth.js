const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const token = jwt.sign(
    { username: user.username },
    'cocktail-app-gael', 
    { expiresIn: '1h' }
  );
  return token;
}

// REGISTER //

router.post('/register', (req,res) => {
  const {firstName, lastName, email, password, phone, deliveryAddress, admin, dateJoined, numberOfOrders, active} = req.body;
  if (email) {
    User.findOne({email})
    .then(user => {
      if (user) {
        return res.status(403).send('this user already exists')
      }
      else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
          const user = new User({
            firstName,
            lastName,
            email,
            password : hash,
            phone,
            deliveryAddress,
            admin,
            dateJoined,
            numberOfOrders,
            active
          })
          user.save(err => {
            if (err) return res.status(400).send('there was an error')
            const token = generateToken(user);
            return res.send(token)
          })
        })
      }
    })
    .catch( err => {
    res.status(400).send(err)
  })
  } 
})

// LOGIN



module.exports = router;