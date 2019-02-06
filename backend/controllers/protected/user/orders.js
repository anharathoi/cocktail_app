const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

/**
|--------------------------------------------------
| LIST ALL CHARGES / ORDERS THAT A CUSTOMER HAS PLACED / BEEN CHARGED WITH
|--------------------------------------------------
*/
//should this be a router.get? probably not because it is not on our server?

router.post('/list-customer-orders', (req, res)  => {
    const { stripeId, email, orderList } = req.body 
    console.log(`17 - orders.controller.js - list all customer orders  ${req.body}`)

    stripe.charges.list(
      { customer: stripeId },
      function(err, charges) {
        console.log(`22 - orders.controller.js - list all customer orders ${charges}`)
        res.send(charges)
        // res send the results back to the front end so that they can be displayed 

        // or have a button that sends off this post - then 

        // so onclick - change the state and 

        // add the cocktails ot the user model - as an array?, then upsert each time - i.e. 

        // then 

        // so add a new

       
          User.findOneAndUpdate({email}, { orderList: charges}, {upsert: true})
          .then((res) => {
          console.log(`39 - orders.controller.js - list all customer orders  ${res}`)
              })
              .catch((err) => {
              console.log(`142 - orders.controller.js - list all customer orders  ${err.response}`)
              })

      }
    );
})

module.exports = router;
