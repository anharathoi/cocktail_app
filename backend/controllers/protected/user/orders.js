const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

//SIMILAR FOR DISPLAYING ON THE ADMIN AREA AS WELL - WE DON'T HAVE TO LIMIT IT BY A SINGLE CUSTOMER EITHER - JUST REMOVE THAT AND CHOOSE ANY OF THE OTHER OBJECTS THAT WE WANT - I.E. DATE, PLAN, AMOUNT ETC.

/**
|--------------------------------------------------
| LIST ALL CHARGES / ORDERS THAT A CUSTOMER HAS PLACED / BEEN CHARGED WITH
|--------------------------------------------------
*/
//should this be a router.get? probably not because it is not on our server?
router.post('/list-customer-orders', (req, res)  => {
    const { stripeId } = req.body 
    console.log(req.body)

    stripe.charges.list(
      { customer: stripeId },
      function(err, charges) {
        console.log(charges);
        // asynchronously called
      }
    );
//email and User.findOne are not required, we dont' need to add these to the database .

})

module.exports = router;
