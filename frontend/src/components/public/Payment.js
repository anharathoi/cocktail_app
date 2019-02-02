import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// require('dotenv')(;

require('dotenv').config()
export default class Payment extends Component {
  state = { 
    payment: false
  }

// componentDidMount = () => {
//   const url = 'http://localhost:5000/me' // DEV
//   axios.get(url)
//   .then(res => res.json())
//   // .then(res => console.log(res))
//   .then(data => {
//     this.setState({
//       email: data.email
//     });
//   });
// }

 
  
  // state = {}

  onToken = (token) => {
    const email = this.props.email
    const selectedOption = this.props.selectedOption
    // const ccLast4 = this.props.ccLast4
    // console.log(selectedOption)
    // console.log(token)
    const data = {
      token,
      email,
      selectedOption,
      // ccLast4
    }

    // const url = 'https://cocktail-app.now.sh/api/stripe' // PROD
    const url = 'http://localhost:5000/api/stripe' // PROD
    axios.post(url, data)
    .then( response => {
      console.log(response)
      const { success } = response.data
      this.setState({ 
        success
      })
 
    })
    .catch ( err => {
      console.log(err.response)
    })
  }  

  render() {
    // const { email} = this.state

    // const email = this.props.email
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
          stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
          // data-email = {email}
          
        />
      </div>
    )
  } 
  }
}
