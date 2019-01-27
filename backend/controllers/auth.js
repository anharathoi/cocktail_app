const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const session = require("express-session");

// Passport Config
require('../config/passport')(passport);

// Express session
router.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null } // defines when the cookie should expire, e.g. { maxAge : 60000 }
}));

// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

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

// LOGIN //
const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      // console.log('anhar says error4')
      return next(err)
    }
    if (!user) { 
      // console.log(`anhar says ${user}`)
      return res.status(401).send(info.message)
    }
    req.logIn(user, (err) => {
      if (err) { 
        // console.log('anhar says error6')
        return next(err)
      }
      req.session.user = user
      // res.send(req.session)
      return res.send("Welcome " + user.email);      
    });
  })(req, res, next);
}

router.post('/login', authenticateUser) 

router.get('/me', (req,res) => {
  res.send(req.user)
})

router.get('/logout', (req, res) => {
  // if(!req.user){
  //   console.log("hello" + user)
  //   req.send("nobody is logged in")
  // }
  // console.log(req.session)
  console.log(req)
  req.logout();
  res.redirect('/');
});

module.exports = router;