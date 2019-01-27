const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

module.exports = (passport) =>{
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => {
      // console.log('anhar errors for days')
      User.findOne({email: email})
      .then( user => {
        // Match User
        if (!user) { 
          // console.log('anhar says error2')
          return done(null, false, { message: 'Incorrect email' });
        }
  
        // Match Password
        bcrypt.compare( password, user.password, (err, resp) => {
          if(err) throw err;
          if(resp){
            return done(null, user)
          } else {
            return  done(null, false, { message: 'Incorrect password'})
          }
        })
      })
      .catch(err => console.log(err))
    }
  ))
  
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  
  passport.deserializeUser((email, done) => {
    User.findOne({ email:email }, (err, user) => {
      done(err, user);
    });
  });
}
