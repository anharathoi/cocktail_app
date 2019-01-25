const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const cookieSession = require('cookie-session')
const session = require("express-session");

router.use(session({ secret: "cats" }));
// router.use(passport.initialize());
// router.use(passport.session());

// const oneDay = 1000 * 60 * 60 * 24;

// const cookie = cookieSession({
//   maxAge: oneDay,
//   keys: ['secret-key']
// });

router.use(passport.initialize());
router.use(passport.session());
// router.use(cookie)

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

// LOGIN
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.findOne({ email:email }, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    // console.log('anhar errors for days')
    User.findOne({ email:email }, (err, user) => {
      // console.log(`${user}`)
      if (err) { 
        // console.log('anhar says error')
        return done(err);
      }
      if (!user) { 
        // console.log('anhar says error2')
        return done(null, false, { message: 'Incorrect email' });
      }
      
      bcrypt.compare( password, user.password, (err, resp) => {
        if(err) {
          return done(null, false, { message: 'Incorrect password' }); 
        }
        
        return done(null, user);
      });
    });
  }
))

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

      // req.session.user = user
      return res.send(user);
      
      
    });
  })(req, res, next);
}


router.post('/login', authenticateUser) 

router.get('/me', (req,res) => {
  res.send(req.user)
})

router.post('/logout', (req, res) => {
  req.logout();
  res.send('Successfully logged out');
});

// router.post('/login', (req, res) => {
//   const {email, password} = req.body;
//   if (email && password){
//       User.findOne({email})
//       .then(doc => {
//           if(doc){
//               bcrypt.compare( password, doc.password, function(err, resp) {
//                   if(resp) {
//                       const token = generateToken(doc);
//                       console.log('password match')
//                       return res.send({token});
//                       // Passwords match
//                   } else {
//                       // Passwords don't match
//                       console.log('password not match')
//                    return res.status(403).send('BAD CREDENTIALS')
//                   } 
//                 });
          
//           } else {
          
//               return res.status(403).send({msg:'BAD CREDENTIALS'});
//           }
//       });
//   }    
// })



module.exports = router;