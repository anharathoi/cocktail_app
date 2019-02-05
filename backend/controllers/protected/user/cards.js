const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

/**
|--------------------------------------------------
| UPDATE CARD 
|--------------------------------------------------
*/

router.post('/updatecard', (req, res)  => {
    const { token, email, stripeId } = req.body

    stripe.customers.update(stripeId, {
        source: token.id,
    })
    
    User.findOneAndUpdate({email}, { paymentSource: token.card }, {upsert: true})
    .then((res) => {
        console.log(res)
        })
        .catch((err) => {
            console.log(err.response)
        })
})

module.exports = router;
    
             //     

                    //    //alternatively i could always look to unshift the entire token id
                    // }).catch((err) => {



                    //     User.findById(req.payload.id).then(function(user){
                    //         if(!user){return res.sendStatus(401);}
                    //         var article = new Article(req.body.article);
                    //         article.author = user;
                    //         return article.save().then(function(){
                    //             return res.json({article: article.toJSONFor(user)})
                    //         });
                    //     }).catch(next);
                        
                    // });
                 




/**
|--------------------------------------------------
| THIS IS WHAT THE TOKEN IS CURRENTLY GIVING US BACK:

{ id: 'tok_1DzYLLFVlUAzhIzIy9K6KQ4I',
  object: 'token',
  card:
   { id: 'card_1DzYLKFVlUAzhIzIZeimaWaB',
     object: 'card',
     address_city: null,
     address_country: null,
     address_line1: null,
     address_line1_check: null,
     address_line2: null,
     address_state: null,
     address_zip: null,
     address_zip_check: null,
     brand: 'MasterCard',
     country: 'US',
     cvc_check: 'pass',
     dynamic_last4: null,
     exp_month: 2,
     exp_year: 2020,
     funding: 'prepaid',
     last4: '5100',
     metadata: {},
     name: 'r@r.com',
     tokenization_method: null },
  client_ip: '144.133.100.250',
  created: 1549151775,
  email: 'r@r.com',
  livemode: false,
  type: 'card',
  used: false }

|--------------------------------------------------
*/



// User.findOne({email})
            
//                 .then( user => {
//                     user.paymentSource = customer.sources.data[0]
//                     return user.save();


//                     user.stripeId = customer.id;
//                     user.paymentSource = customer.sources.data[0]
//                     return user.save();
                    // user.last4 = ((Card) customer.sources.data[0]).last4
                    // console.log(customer.sources.data[0].card.last4) // this line and the one above it stops the system from adding the stripe id to the user - it errors out - silently

// })
    // console.log(token)
    
    // .then( user => {
    //     customerId = user.stripeId
    //     // console.log(customerId)
    //     // return user
    // })
    // console.log(token)
    



// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   };

// router.post('/newcocktail', (req, res) => {
//     const {title, photo, description, directions, ingredients, available} = req.body;
//     Cocktail.create ({
//       title,
//       photo,
//       description,
//       directions,
//       ingredients,
//       available
//     })
//     .then ( cocktail => {
//       res.send(cocktail);
//     })
//     .catch( err => {
//       res.status(404).send(err);
//     })
//    })

// router.post('api/stripe/cardupdate', (req, res)  => {
    //  (err, customer) => {
       
    //     .then( user => {
    //         user.sources = customer.sources // will need to make a 'sources' thing within the model
    //     //     user.last4 = customer.card.last4;
        //     // console.log(customer.card.last4) // this line and the one above it stops the system from adding the stripe id to the user - it errors out - silently
//             return user.save();
//         }) 
//         .catch( err => console.log(err))
//     })
// })
                // if (err) {
                //         res.send({
                //             success: false,
                //             message: err
                //         })
                // }







//     stripe.customers.create({
// 	    email: email,
// 	    source: token.id,
//     }, ((err, customer) => {
//     User.findOne({email})
            
//     .then( user => {
//         user.stripeId = customer.id;
//         // user.last4 = customer.card.last4;
//         // console.log(customer.card.last4) // this line and the one above it stops the system from adding the stripe id to the user - it errors out - silently
//         return user.save();
//     })
//     .catch( err => console.log(err))
//         if (err) {
//                 res.send({
//                     success: false,
//                     message: err
//                 })
//         } else if (selectedOption === "monthlyFrequency") {
//                 const { id } = customer
//                 stripe.subscriptions.create({
//                     customer: id, 
//                     items: [
//                         {
//                             plan: "plan_EOUDCdORXev2JW",
//                         },
//                     ],
//                 }, function(err, subscription) {
//                     if (err) { 
//                         res.send({
//                             success: false,
//                             message: 'Error'
//                         })
//                     }
//                     else {
//                         res.send({
//                         success: true,
//                         message: 'Success'
//                     })
//                 }
//             })
//         }
//         else if (selectedOption === "quarterlyFrequency") {
//                 const { id } = customer
//                 console.log('hello')
//                 stripe.subscriptions.create({
//                     customer: id, 
//                     items: [
//                         {
//                             plan: "plan_EOUE6qieRKFekI",
//                         },
//                     ],
//                 }, function(err, subscription) {
//                     if (err) { 
//                         res.send({
//                             success: false,
//                             message: 'Error'
//                         })
//                     }
//                     else {
//                         res.send({
//                         success: true,
//                         message: 'Success'
//                     })
//                 }
//             })
//         }
// })
// )}
// )









//         source: token.id,
//         default_source: source
//     })
// })



    // const { token, email} = req.body

    // stripe.customers.create({
	//     email: email,
	//     source: token.id,
    // }, ((err, customer) => {
    //         User.findOne({email})
            
    //             .then( user => {
    //                 user.stripeId = customer.id;
    //                 user.last4 = customer.card.last4;
    //                 console.log(customer.card.last4)
    //                 return user.save();
    //             })
    //             .catch( err => console.log(err))
    //                 if (err) {
    //                         res.send({
    //                             success: false,
    //                             message: err
    //                         })
                            
    //                         // stripe.update
                        // })

                        

// if stripetoken // if isset post stripetoken?

// //in a post method
// //try
// // retrive the stripe customer id - that is in my database
// i am thinking a findone by email - then getting the user.stripId
// //then get the stripeToken obtained with checkout
// source = stripeToken
// // then save the user

// .then((result) => {
    
// }).catch((err) => {
//     // 
// });

// //to be display ot hte customer later in the page
// //body = e.getJsonBody
// //err = body (err)

// then be sure to require this file at the top of the Component in react

// // so there are three parts to this - this server side bit, then addiing it into another server file - update - then the front end




// router.get('api/stripe/updatecard', (req, res, next)  => {

//     stripe.customers.retrieve(user.stripeId,
//         function(err, customer) {

//         })

// })
        // const { source } = req.body



//         User.findOne(req.userId) 

// // User.findOne({email})
//     .then( user => {
//     stripeCustomerId = user.stripeID
//     console.log(stripeCustomerId)
// // return user.save();
// })

// stripe.customers.update(stripeCustomerId, { 
//     // source: token.id,
//      default_source: source
// })
// })

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