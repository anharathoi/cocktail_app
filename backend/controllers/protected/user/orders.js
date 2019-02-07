const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

/**
|--------------------------------------------------
| LIST ALL CHARGES / ORDERS THAT A CUSTOMER HAS PLACED / BEEN CHARGED WITH
|--------------------------------------------------
*/

router.post('/list-customer-orders', (req, res)  => {
    const { stripeId, email, orderList } = req.body 
    // console.log(`16 - orders.controller.js - list all customer orders  ${req.body}`)

    stripe.charges.list(
      { customer: stripeId },
      function(err, charges) {
        // console.log(`21 - orders.controller.js - list all customer orders ${charges}`)
        res.send(charges)
       
          User.findOneAndUpdate({email}, { orderList: charges}, {upsert: true})
          .then((res) => {
          // console.log(`26 - orders.controller.js - list all customer orders  ${res}`)
              })
              .catch((err) => {
              // console.log(`29 - orders.controller.js - list all customer orders  ${err.response}`)
              })

      }
    );
})

module.exports = router;
