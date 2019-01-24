
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
// Load User Model

const User = require('../models/User.model');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy( {usernameField: 'email'}, (email, password, done) => {
      // Match User
      User.findOne({email: email})
      console.log("what")
      .then( user => {
        if(!user){
          return done(null, false, {message: "No email"})
        }
        console.log("no way")
        // Match password
        if(password === user.password){
          console.log(password)
          return done(null, user)
        } else {
          return done(null, false, {message: 'Password Incorrect'})
        }
      })
      .catch( err => console.log(err))
    })
    
  )
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}