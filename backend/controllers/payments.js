const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
// const dotenv = require('dotenv');
require('dotenv').config();

// console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY) // this is not posting

router.post('/api/stripe', (req, res, next) =>{
	const { token, email } = req.body
	
	// console.log(email)
	// console.log(`this is ${JSON.stringify(token)}`)
  stripe.customers.create({
		email: email,
		source: token.id,
    }, ((err, customer) => {
			User.findOne({email})
			.then( user => {
				// console.log("--------------")
				// console.log('this is inside mongoose query '+ customer)
				// console.log("--------------")
				user.stripeId = customer.id;
				return user.save();
			})
			.catch( err => console.log(err))
			// console.log(err)
      if(err) {
				res.send({
					success: false,
					message: err
				})
      } else {
				// console.log("--------------")
				// console.log(`this is customer else ${JSON.stringify(customer)}`)
				// console.log("--------------")
					const { id } = customer
					stripe.subscriptions.create({
						customer: id, 
						items: [
							{
								plan: "plan_EOj3sJNhbq39cy",
							},
						],
					}, function(err, subscription) {
							console.log(`error : ${err}`)
							console.log(`subscription:${JSON.stringify(subscription)}`)
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
								// res.redirect(
								// 	'http:/localhost:3000/userprofile'
								// )
							}
						}
					)
      	}
			}
		)
  )	
})

module.exports = router;