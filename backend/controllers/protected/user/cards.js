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
    // console.log(`16 - cards.controller.js - update a card  ${req.body}`)

    stripe.customers.update(stripeId, {
        source: token.id,
    })
    
    User.findOneAndUpdate({email}, { paymentSource: token.card }, {upsert: true})
    .then((res) => {
        console.log(`24 - cards.controller.js - update a card  ${res}`)
        })
        .catch((err) => {
            console.log(`27 - cards.controller.js - update a card  ${err.response}`)
        })
})

module.exports = router;
  