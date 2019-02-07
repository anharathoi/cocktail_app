import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import './Payment.css'
require('dotenv').config()

export default class Payment extends Component {
  state = { 
    payment: false
  }

  onToken = (token) => {
    // props are being passed down from the Register.js component
    const email = this.props.email
    const selectedOption = this.props.selectedOption
    
    const data = { token, email, selectedOption,}
    const url =  `${process.env.REACT_APP_DOMAIN}/api/stripe`

    axios.post(url, data)
      .then( response => {
        console.log(response.data)
        const { success } = response.data
        this.setState({ 
          success
        })
        // console.log(this.props)
        this.props.setPayment()
      })
      .catch ( err => {
        console.log(err.response)
      })
  }  

  render() {
    if (this.state.success) {
      return <Redirect to="/UserProfile" />
    } 
    else {
    return (
      <div style={{paddingTop: '40px'}}>
        <StripeCheckout
          amount = {8700}
          currency = "AUD"
          token = {this.onToken}
<<<<<<< HEAD
          stripeKey = {"pk_test_PaDGT4uUhSf2yNoqbv08QU6X"}
=======
          stripeKey = {`${process.env.REACT_APP_STRIPE_KEY}`}
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b
          // email={this.state.email}
          label="Join Bottle Batched"
          panelLabel="Start my Subscription"
          data-panel-label = {"Welcome to Bottle Batched your cocktail subscription service"}
          image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
          />
      </div>
    )
  } 
}
}
