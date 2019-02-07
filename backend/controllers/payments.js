const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY) // this is not posting

router.post('/api/stripe', (req, res, next) => {
    const { token, email, selectedOption } = req.body
    stripe.customers.create({
	    email: email,
	    source: token.id,
    }, ((err, customer) => {
			User.findOne({email})

                .then( user => {
                    user.stripeId = customer.id;
                    return user.save();
                })
                .catch( err => console.log(err))
            if (err) {
                    res.send({
                        success: false,
                        message: err
                    })
            } else if (selectedOption === "monthlyFrequency") {
                    const { id } = customer
                    stripe.subscriptions.create({
                        customer: id, 
                        items: [
                            {
                                plan: "plan_ETzeK7ZRfVnU6j",  
                            },
                        ],
                    }, function(err, subscription) {
                        if (err) { 
                            res.send({
                                success: false,
                                message: 'Error'
                            })
                        }
                        else {
                            res.send({
                            success: true,
                            message: 'Success'
                        })
                    }
                })
            }
            else if (selectedOption === "quarterlyFrequency") {
					const { id } = customer
					console.log('hello')
                    stripe.subscriptions.create({
                        customer: id, 
                        items: [
                            {
                                plan: "plan_ETzejNRas25Hwt",
                            },
                        ],
                    }, function(err, subscription) {
                        if (err) { 
                            res.send({
                                success: false,
                                message: 'Error'
                            })
                        }
                        else {
                            res.send({
                            success: true,
                            message: 'Success'
                        })
                    }
                })
            }
        })
    )}
)


module.exports = router;