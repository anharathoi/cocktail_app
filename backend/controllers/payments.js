const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET) 

router.post('/api/stripe', (req, res, next) => {
    const { token, email, selectedOption } = req.body
    console.log(req.body);
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
<<<<<<< HEAD
                                plan: "plan_ETzeK7ZRfVnU6j",  
=======
                                plan: process.env.MONTHLY_PLAN
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b
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
<<<<<<< HEAD
                                plan: "plan_ETzejNRas25Hwt",
=======
                                plan: process.env.QUARTERLY_PLAN,
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b
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