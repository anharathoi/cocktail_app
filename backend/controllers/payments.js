const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
require('dotenv').config();

// console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY) // this is not posting

router.post('/api/stripe', (req, res, next) =>{
	// const stripeToken = req.body.stripeToken
	const { token, email } = req.body
	console.log("--------------")
	console.log(email)
	console.log(`this is ${JSON.stringify(token)}`)
	// console.log(`HELOooooo ${req.user}`)	
	// const user = {
	// 	email:"dog@doggo.com",
	// 	password: "password"
	// }
  stripe.customers.create({
      email: email,
      source: token.id,
    }, ((err, customer) => {
			// console.log(err)
			console.log(`this is customer ${customer}`)
      if(err) {
          res.send({
						success: false,
						message: err
          })
      } else {
				console.log(`this is customer ${customer}2`)
					const { id } = customer
					stripe.subscriptions.create({
						customer: id, // this needs to be changed or moved up
						items: [
								{
									plan: "plan_EOj3sJNhbq39cy",
								},
							],
						}, function(err, subscription) {
								console.log(`error : ${err}`)
								console.log(`subscription:${subscription}`)
									if (err) { 
										res.send({
											success: false,
											message: 'Error'
										})
									} else {
											res.send({
											success: true,
											message: 'Success'
										})
									}
								})
      }
    })
  )
	
})


module.exports = router;