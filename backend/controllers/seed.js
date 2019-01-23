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










// const express = require('express');
// const router = express.Router();
// const User = require('../models/User.model')
// const passport = require('passport') 
// const LocalStrategy = require('passport-local').Strategy
// //maybe we need to add passport to app.use passport


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

// // post to login

// // passport.use(new LocalStrategy(
// //   (email, password, done) => {
// //     console.log('anhar errors for days')
// //     User.findOne({ email:email }, (err, user) => {
// //       console.log(`${user}`)
// //       if (err) { 
// //         console.log('anhar says error')
// //         return done(err); }
// //       if (!user) { 
// //         console.log('anhar says error2')
// //         return done(null, false, { message: 'Incorrect email' }); }
// //       if (user.password !== password) { 
// //         console.log('anhar says error3')
// //         return done(null, false, { message: 'Incorrect password' }); }
// //       return done(null, user);
// //     });
// //   }
// // ))
  
// // const authenticateUser = (req, res, next) => {
// //   passport.authenticate('login', (err, user, info) => {
// //     if (err) { 
// //       console.log('anhar says error4')
// //       return next(err) }
// //     if (!user) { 
// //       console.log(`anhar says ${user}`)
// //       return res.status(401).send(info.message) }
// //     req.logIn(user, (err) => {
// //       if (err) { 
// //         console.log('anhar says error6')
// //         return next(err) }
// //       return res.send('Successfully authenticated');
// //     });
// //   })(req, res, next);
// // }
// // router.post('/login', {}) 
// passport.use('/login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, async (email, password, done) => {
//   try {
//     const user = await User.findOne({ email: email })
//     if(!user){
//         return done(null, false, {message: "User not found" })
//     }

//     const validate = await user.isValidPassword(password)
//     if(!validate){
//         return done(null, false, {message: "Wrong Password"})
//     }
//     return done(null, user, {message: "Logged in Succesfully"})
//   } catch (error) {
//       return done(error)
//   }
// }))


// router.post('/register', (req, res) => {
//   // create a new User
//   // save the user
//   // req.logIn logic
// })
// router.get('/logout', (req, res) => {
// req.logout();
// res.send('Successfully logged out');
// });





// module.exports = router;


// const passport = require('passport')
// const localStrategy = require('passport-local').Strategy 
// const UserModel = require('../model/model');

// passport.use('signup', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password'

// }, async (email, password, done) => {
//     try {
//         const user = await UserModel.create({ email, password })
//         return done(null, user)
//     } catch (error) {
//         done(error)
//     }
// }))

// passport.use('login', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const user = await UserModel.findOne({ email })
//         if(!user){
//             return done(null, false, {message: "User not found" })
//         }

//         const validate = await user.isValidPassword(password)
//         if(!validate){
//             return done(null, false, {message: "Wrong Password"})
//         }
//         return done(null, user, {message: "Logged in Succesfully"})
//     } catch (error) {
//         return done(error)
//     }
// }))

// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt

// passport.use(new JWTstrategy({
//     secretOrKey: 'top_secret',
//     jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//     try {
//         return done(null, token.user)
//     } catch (error) {
//         done(error)
//     }
// }))

// const passport = require('passport')
// const localStrategy = require('passport-local').Strategy 
// const UserModel = require('../models/User.model');

// passport.use('signup', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // this allows us to pass back the entire request to the callback 
// }, 
//     function(req, email, password, done) {
//         process.nextTick(function() {
//             User.findOne({ 'local.email' : email }, function (err, user) {
//                 if (err) 
//                 return done (err)
//                 if (user) {
//                     return done(null, false)
//                 } else {
//                     var newUser = new UserModel()
//                     newUser.local.email = email
//                     newUser.local.password = newUser.generateHash(password)
//                     newUser.local.lastName = lastName
//                     newUser.local.firstName = firstName
//                     newUser.local.phone = phone
//                     newUser.local.deliveryAddress = deliveryAddress

//                     newUser.save(function(err) {
//                         if(err)
//                         throw err
//                         return done(null, newUser)
//                     })
//                 }
//             })
//         })
//     }
// ))

// const express = require('express');
// const router = express.Router();

const passport = require('passport')
const localStrategy = require('passport-local').Strategy 
const UserModel = require('../models/User.model');

const express = require('express')
const router = express.Router()

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // this allows us to pass back the entire request to the callback 
}, 
    function(req, email, password, done) {
        process.nextTick(function() {
            UserModel.findOne({ 'email' : email }, function (err, user) {
                if (err) 
                return done (err)
                if (user) {
                    return done(null, false)
                } else {
                    var newUser = new UserModel()
                    newUser.email = email
                    newUser.password = password
                   

                    newUser.save(function(err) {
                        if(err)
                        throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }
))








passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email })
        if(!user){
            return done(null, false, {message: "User not found" })
        }

        const validate = await user.isValidPassword(password)
        if(!validate){
            return done(null, false, {message: "Wrong Password"})
        }
        return done(null, user, {message: "Logged in Succesfully"})
    } catch (error) {
        return done(error)
    }
}))

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (error) {
        done(error)
    }
}))


module.exports = router