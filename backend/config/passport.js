const jwtSecret = require('./jwtConfig')
const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 10;

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../models/User.model.js'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            userField: 'email',
            passwordField: 'password',
            session: false,
            
        },
        (email, password, done) => {
            try {
                User.findOne({ userField: email })
                .then(user => {
                    if (user !== null) {
                        console.log('email already taken');
                        return done(null, false, { message: 'email already taken'});
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            User.create({ email, password: hashedPassword }).then(user => {
                                console.log('user created');
                                return done(null, user);
                            });
                        });
                    };
                });
            } catch (err) {
                done(err);
            };
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            emailField: 'email',
            passwordField: 'password',
            session: false,
        },
        (email, password, done) =>{
            try {
                User.findOne({ userField: email})
                .then(user => {
                    if (user === null) {
                        return done(null, false, { message: 'bad email' })
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if (response !== true) {
                                console.log("passwords do not match")
                                return done(null, false, { message: 'passwords do not match'})
                        }
                        console.log('user found and authenticated')
                        return done(null, user)
                        })
                    }
                })
            } catch (err) {
                done(err)
            }
        }
    )
)

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
}

passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({ email: jwt_payload.id })
            .then(user => {
                if (user) {
                    console.log('user found in db in passport')
                    done(null, user)
                } else {
                    console.log('user not found in db')
                    done(null, false) 
                 }
                    })
                } catch (err) {
                    done(err)
                }
            })
)