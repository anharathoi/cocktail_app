const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport') 
//maybe we need to add passport to app.use passport


// post to register

// router.post('/register', (req, res, next) => {
//   passport.authenticate('register', (err, user, info) => {
//     if (err) {
//       console.log(err);
//     }
//     if (info !== undefined) {
//       console.log(info.message);
//       res.send(info.message);
//     } else {
//       req.logIn(user, err => {
//         const data = {
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           email: req.body.email,
//         };
//         User.findOneAndUpdate({
//           email: user.email
//         })
//         .then(user => {
//           user
//           .update({
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//           })
//           .then(() => {
//             console.log('user created in db');
//             res.status(200).send({message: 'user created' });
//           })
//         })
//       })
//     }
//   })(req, res, next);
// })


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

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username' }); }
      if (user.password !== password) { return done(null, false, { message: 'Incorrect password' }); }
      done(null, user);
    });
  }
))
  
  const authenticateUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) { return res.status(401).send(info.message) }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        return res.send('Successfully authenticated');
      });
    })(req, res, next);
  }
  
  router.post('/login', authenticateUser)
  router.post('register', (req, res) => {
    // create a new User
    // save the user
    // req.logIn logic
  })
  router.get('/logout', (req, res) => {
  req.logout();
  res.send('Successfully logged out');
});





module.exports = router;