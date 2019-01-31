const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// Passport Config
require('../config/passport')(passport);

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

// JWT token create
const generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email },
    'cocktail-app-gael', 
    { expiresIn: '1h' }
  );
  return token;
}

// REGISTER //
router.post('/register', (req,res) => {
  const {firstName, lastName, email, password, phone, deliveryAddress, admin, dateJoined, numberOfOrders, active, selectedOption} = req.body;
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
            active,
            selectedOption
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

// LOGIN //
const authenticateUser = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) { 
      // console.log('anhar says error4')
      return next(err)
    }
    if (!user) { 
      // console.log(`anhar says ${user}`)
      return res.status(401).send(info.message)
    }
    req.logIn(user, {session: false}, (err) => {
      if (err) { 
        // console.log('anhar says error6')
        return next(err)
      }

      // console.log(user.email) // prints user email - checked
      const token = generateToken(user)
      // res.send(req.session)
      // setting cookie in the header
      // res.setHeader('token', token)
      return res.send({user,token});
    });
  })(req, res, next);
}

router.post('/login', authenticateUser) 

router.get('/me', passport.authenticate('jwt', {session: false}), (req,res) => {
  console.log(req.user)
  res.send(req.user)
})

router.get('/logout',passport.authenticate('jwt', {session: false}),(req, res) => {
  const {email} = req.user
  req.logout();
  res.send( `${email} has successfully logged out`);
});

module.exports = router;