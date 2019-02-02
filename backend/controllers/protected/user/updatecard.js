const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

// router.post('api/stripe/updatecard', ( {source}, {req}) => {
//     // const { source } = req.body
//     const user = User.findOne(req.userId) 

//     if (!req.userId) {
//         throw new Error ("not today buddy");
//     }

//     if (!user) {
//         throw new Error("no user id")
//     }

//     stripe.customers.update(user.stripeId, { source })

//     user.ccLast4 = ccLast4

//     user.save()

//     return user;
// })


// module.exports = router;

// }
// My FIFTH ATTEMPT
// router.post('/api/stripe', (req, res, next) => {
//     const { source } = req.body
    // const source = req.body.source
    // stripeCustomerId = () => {

        router.post('api/stripe', ( {source}, {req}) => {
                // const { source } = req.body
                User.findOne(req.userId) 

        // User.findOne({email})
            .then( user => {
            stripeCustomerId = user.stripeID
            console.log(stripeCustomerId)
        // return user.save();
        })
    
        stripe.customers.update(stripeCustomerId, { 
            // source: token.id,
             default_source: source
        })
})

module.exports = router;

// MY SIXTH ATTEMPT


// do i just throw this into the payments.js controller - where the other stuff is?
        // .then 
        //     .then(user => {
        //     // stripeCustomerId = user.stripeId
        //     console.log(stripeCustomerId)
        //     console.log(user.stripId);
        // // return user

    // if (!user || !user.stripeId ) { //can potentially get rid of some of these
    //     throw new Error();
    // }















// ((err, customer) => {
            // function(err, customer) {

    //             User.findOne({email})
    //             .then( user => {
    //                 user.stripeId = customer.id;
    //                 return user.save();
    //             })
    //             .catch( err => console.log(err))
    //             if (err) {
    //                     res.send({
    //                         success: false,
    //                         message: err
    //                     })
    //                 } else {
    //                     const { id } = customer
    //                     stripe.subscriptions.create({
    //                         customer: id, 
    //                         items: [
    //                             {
    //                                 plan: "plan_EOUDCdORXev2JW",
    //                             },
    //                         ],
    //                     }, function(err, subscription) {
    //                         if (err) { 
    //                             res.send({
    //                                 success: false,
    //                                 message: 'Error'
    //                             })
    //                         }
    //                         else {
    //                             res.send({
    //                             success: true,
    //                             message: 'Success'
    //                         })
    //                     }
    //                 })
    //             }
                
//                 $cu->source = $_POST['stripeToken']; // obtained with Checkout
//                 $cu->save();
            
//                 $success = "Your card details have been updated!";

//                 //adding in the customers email automatically:

//                 data-email="<?php echo $email; ?>"> as an attribute ont he front end

// //let customers know they were successful
//                 <?php
// if (isset($error)) {
//   echo $error;
// } elseif (isset($success)) {
//   echo $success;
// }
// ?>
                
            


// router.post('/api/stripe', (req, res, next) => {
//     const { token, email, selectedOption } = req.body
//         stripe.customers.update({
//             // email: email,
//             source: token.id,
//         } ((err, customer) => {
//             User.findOne({email})
//             .then( user => {
//                 user.stripeId = customer.id;
//                 return user.save();
//             })
//             .catch( err => console.log(err))
//             if (err) {
//                     res.send({
//                         success: false,
//                         message: err
//                     })
//                 } else {
//                     const { id } = customer
//                     stripe.subscriptions.create({
//                         customer: id, 
//                         items: [
//                             {
//                                 plan: "plan_EOUDCdORXev2JW",
//                             },
//                         ],
//                     }, function(err, subscription) {
//                         if (err) { 
//                             res.send({
//                                 success: false,
//                                 message: 'Error'
//                             })
//                         }
//                         else {
//                             res.send({
//                             success: true,
//                             message: 'Success'
//                         })
//                     }
//                 })
//             }
            
 
            
//             "cus_EPB6wYYkgQQfWS", {
//             description: "Customer for jenny.rosen@example.com"
//         }, function(err, customer) {
//             // asynchronously called
//         });



       
              
                   
                
                
//                 }
//             })
//         )}
//     )
    
//     module.exports = router;

// // // Updates the payment source on file for a customer


// // // Use your test API key (switch to the live key later)
// // \Stripe\Stripe::setApiKey("sk_test_PUVHl7tliOGsi1hksT8jUXHU");

// // if (isset($_POST['stripeToken'])){
// //   try {
// //     $cu = \Stripe\Customer::retrieve($customer_id); // stored in your application
// //     $cu->source = $_POST['stripeToken']; // obtained with Checkout
// //     $cu->save();

// //     $success = "Your card details have been updated!";
// //   }
// //   catch(\Stripe\Error\Card $e) {

// //     // Use the variable $error to save any errors
// //     // To be displayed to the customer later in the page
// //     $body = $e->getJsonBody();
// //     $err  = $body['error'];
// //     $error = $err['message'];
// //   }
// //   // Add additional error handling here as needed
// // }
// // ?>


// // Require the update_card.php file immediately at the top of your update.php page before your Checkout form. As a simple trick, you can have it be included only upon form submission