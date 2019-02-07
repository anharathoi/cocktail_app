const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

/**
|--------------------------------------------------
| ADD A MONTHLY SUBSCRIPTION TO A CUSTOMER
|--------------------------------------------------
*/

router.post('/add-monthly-subscription', (req, res)  => {
    const {stripeId, email, subscriptionId, selectedOption} = req.body 
    // console.log(`16 - subscriptions.controller.js - add a monthly subscription ${req.body}`)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: process.env.MONTHLY_PLAN,
          },
        ]
      }, function(err, subscription) {
        //   console.log(`26 ${subscription}`);
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "monthlyFrequency"}, {upsert: true})
                   .then((res) => {
                    //    console.log(`29 - subscriptions.controller.js - add a monthly subscription  ${res}`)
                       })
                       .catch((err) => {
                        // console.log(`32 - subscriptions.controller.js - add a monthly subscription  ${err.response}`)
                       })
        }
      );
})

/**
|--------------------------------------------------
| ADD A QUARTERLY SUBSCRIPTION TO A CUSTOMER
|--------------------------------------------------
*/

router.post('/add-quarterly-subscription', (req, res)  => {
    const {stripeId, email, subscriptionId, selectedOption} = req.body //
    // console.log(`46 - subscriptions.controller.js - add a quarterly subscription  ${req.body}`)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: process.env.QUARTERLY_PLAN,
          },
        ]
      }, function(err, subscription) {
        // console.log(`56 - subscriptions.controller.js - add a quarterly subscription  ${subscription}`)
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "quarterlyFrequency"}, {upsert: true})
                   .then((res) => {
                    // console.log(`59 - subscriptions.controller.js - add a quarterly subscription  ${res}`)
                       })
                       .catch((err) => {
                        // console.log(`62 - subscriptions.controller.js - add a quarterly subscription  ${err.response}`)
                       })
        }
      );
})

/**
|--------------------------------------------------
| UPDATE SUBSCRIPTION TO A MONTHLY SUBSCRIPTON
|--------------------------------------------------
*/

router.post('/updatetomonthlysubscription', (req, res)  => { // DEV
    const { email, subscriptionId } = req.body
    // console.log(`76 - subscriptions.controller.js - update to a monthly subscription  ${req.body}`)

    stripe.subscriptions.update(
        subscriptionId, 
        { plan: process.env.MONTHLY_PLAN },
                function(err, subscription) {
                    // console.log(`82 - subscriptions.controller.js - update to a monthly subscription  ${subscription}`)

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                    // console.log(`86 - subscriptions.controller.js - update to a monthly subscription  ${res}`)
                       })
                       .catch((err) => {
                        // console.log(`89 - subscriptions.controller.js - update to a monthly subscription  ${err.response}`)
                       })
                })
})

/**
|--------------------------------------------------
| UPDATE SUBSCRIPTION TO A QUARTERLY SUBSCRIPTON
|--------------------------------------------------
*/

router.post('/updatetoquarterlysubscription', (req, res)  => { 
        const { email, subscriptionId } = req.body
        // console.log(`102 - subscriptions.controller.js - update to a quarterly subscription  ${req.body}`)

        stripe.subscriptions.update(
            subscriptionId, 
            { plan: process.env.QUARTERLY_PLAN },
                function(err, subscription) {
                    // console.log(`108 - subscriptions.controller.js - update to a quarterly subscription  ${subscription}`)

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                    // console.log(`112 - subscriptions.controller.js - update to a quarterly subscription  ${res}`)
                       })
                       .catch((err) => {
                        // console.log(`115 - subscriptions.controller.js - update to a quarterly subscription  ${err.response}`)
                       })
            })
        })

/**
|--------------------------------------------------
| DELETE A SUBSCRIPTION FROM A CUSTOMER
|--------------------------------------------------
*/

router.post('/cancelsubscription', (req, res)  => {
    const {subscriptionId, email} = req.body
    // console.log(`128 - subscriptions.controller.js - delete a subscription  ${req.body}`)

    stripe.subscriptions.del(
        subscriptionId,
        function(err, confirmation) {
            // console.log(`133 - subscriptions.controller.js - delete a subscription  ${confirmation}`)
            
                   User.findOneAndUpdate({email}, { selectedOption: "no-subscription", subscriptionId: "no-subscription"}, {upsert: true})
                   .then((res) => {
                    // console.log(`137 - subscriptions.controller.js - delete a subscription  ${res}`)
                       })
                       .catch((err) => {
                        // console.log(`140 - subscriptions.controller.js - delete a subscription  ${err.response}`)
                       })
        }
    );

})

module.exports = router;