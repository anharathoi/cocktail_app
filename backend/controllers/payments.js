const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET) 

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
                    // console.log(`29 - payments.controller - selected option quarterly frequency ${customer})
                    stripe.subscriptions.create({
                        customer: id, 
                        items: [
                            {
                                plan: process.env.MONTHLY_PLAN
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
					// console.log(`54 - payments.controller - selected option quarterly frequency ${customer})
                    stripe.subscriptions.create({
                        customer: id, 
                        items: [
                            {
                                plan: process.env.QUARTERLY_PLAN,
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