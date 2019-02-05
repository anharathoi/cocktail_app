const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

/**
|--------------------------------------------------
| ADD A MONTHLY SUBSCRIPTION TO A CUSTOMER
|--------------------------------------------------
*/

router.post('/add-monthly-subscription', (req, res)  => {
    const {stripeId, email, subscriptionId, selectedOption} = req.body //
    console.log("YO GUY THIS IS WHERE ITS AT")
    console.log(req.body)
    console.log(stripeId)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: "plan_EOUDCdORXev2JW",
          },
        ]
      }, function(err, subscription) {
        //   console.log(subscription)
          // asynchronously called
        //   console.log(`144 ${subscription}`);
                // const subscriptionidfromstripe = subscription.id
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "monthlyFrequency"}, {upsert: true})
                   .then((res) => {
                       console.log("howdy guy - do better");
                    //    console.log(res)
                       })
                       .catch((err) => {
                        //    console.log(err.response)
                           console.log(('wrong"'))
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
    console.log("YO GUY THIS IS WHERE ITS AT")
    console.log(req.body)
    console.log(stripeId)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: "plan_EOUE6qieRKFekI",
          },
        ]
      }, function(err, subscription) {
          console.log(subscription)
          // asynchronously called
        //   console.log(`144 ${subscription}`);
                // const subscriptionidfromstripe = subscription.id
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "quarterlyFrequency"}, {upsert: true})
                   .then((res) => {
                       console.log("howdy guy - do better");
                    //    console.log(res)
                       })
                       .catch((err) => {
                        //    console.log(err.response)
                           console.log(('wrong"'))
                       })
        }
      );
})


/**
|--------------------------------------------------
| RETRIEVE A SUBSCRIPTION
|--------------------------------------------------
*/

// router.post('/retrievesubscription', (req, res)  => {
//     // const {token, email, stripeId} = req.body //
//     const {token, email } = req.body
//     console.log(token)
//     console.log(email) //currently giving 'undefined'
// // var stripe = require("stripe")("sk_test_PUVHl7tliOGsi1hksT8jUXHU");

// stripe.subscriptions.retrieve(
//     "sub_EPA1QfdsWx6ybu",
//     function(err, subscription) {
//     // asynchronously called
//     }
// );
// })
    
/**
 |--------------------------------------------------
    | UPDATE/SWITCH A SUBSCRIPTION
    TO DO:
    - replace hardcoded subscription with way of getting current users subscription
    |--------------------------------------------------
    */

    //    router.post('/updatesubscription', (req, res)  => { // PROD
router.post('/updatetoquarterlysubscription', (req, res)  => { // DEV
        const { email, subscriptionId } = req.body
        console.log(req.body)
        console.log(subscriptionId);

        stripe.subscriptions.update(
            subscriptionId, 
            { plan: "plan_EOUE6qieRKFekI" },
                function(err, subscription) {
                   console.log(subscription);

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                       console.log("howdy guy - do better");
                       console.log(res)
                       })
                       .catch((err) => {
                           console.log(err.response)
                           console.log(('wrong"'))
                       })
                    // id: subscription.items.data[0].id,
                    // plan: "plan_EOUE6qieRKFekI", //hardcoded plan id for Quarterly
            })
        })

//    router.post('/updatetomonthlysubscription', (req, res)  => { // PROD
router.post('/updatetomonthlysubscription', (req, res)  => { // DEV
    const { email, subscriptionId } = req.body
    console.log(`162 ${req.body}`)
    console.log(`163 ${subscriptionId}`);

    stripe.subscriptions.update(
        subscriptionId, 
        { plan: "plan_EOUDCdORXev2JW" },
                function(err, subscription) {
                   console.log(subscription);

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                       console.log("howdy guy - do better");
                       console.log(res)
                       })
                       .catch((err) => {
                           console.log(err.response)
                           console.log("wrong")
                       })
                    // id: subscription.items.data[0].id,
                    // plan: "plan_EOUE6qieRKFekI", //hardcoded plan id for Quarterly
            })
})


/**
|--------------------------------------------------
| DELETE A SUBSCRIPTION FROM A CUSTOMER
|--------------------------------------------------
*/

router.post('/cancelsubscription', (req, res)  => {

    const {subscriptionId, email} = req.body
    console.log(req.body) 

    stripe.subscriptions.del(
        subscriptionId,
        function(err, confirmation) {
            
            console.log(confirmation);

                   User.findOneAndUpdate({email}, { selectedOption: "no-subscription", subscriptionId: "no-subscription"}, {upsert: true})
                   .then((res) => {
                       console.log(res)
                       })
                       .catch((err) => {
                           console.log(err.response)
                           console.log(('wrong"'))
                       })
        }
    );

})

module.exports = router;