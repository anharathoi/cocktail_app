const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'cocktail-app-gael'
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOne({email: jwtPayload.email})
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  
  passport.deserializeUser((email, done) => {
    User.findOne({ email:email }, (err, user) => {
      done(err, user);
    });
  });
}
