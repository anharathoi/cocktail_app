import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

require('dotenv').config()
export default class Payment extends Component {
  state = {}
  onToken = (token) => {
    const email = this.props.email
    // console.log(token)
    axios.post('http://localhost:5000/api/stripe', {
      token,
      email
    })
    .then( response => {
      console.log(response)
    })
    .catch ( err => {
      console.log(err.response)
    })
  }
  render() {
    return (
      <div>
        <StripeCheckout
          token = {this.onToken}
          stripeKey = {"pk_test_22vQKgTT4CWWMUuAzR2OsHUn"}
        />
      </div>
    )
  }
}
