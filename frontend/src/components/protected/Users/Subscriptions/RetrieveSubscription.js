import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class RetrieveSubscription extends Component {
    state = { }

    //I am using this cdm a lot - can we DRY it up?
    componentDidMount = () => {
      const url = `${process.env.REACT_APP_DOMAIN}/me`
      const token = Cookies.get('token')
        axios.get(url, {
          headers: {
            'Authorization': `bearer ${token}`
          },
        })
        .then ( resp => {
          console.log(resp)
          const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption } = resp.data
          this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption })
        })
        .catch( err => console.log(err) )
    }
  
  onToken = (token) => {
    const stripeId = this.props.stripeId
    const email = this.props.email
    const url = `${process.env.REACT_APP_DOMAIN}/retrievesubscription`
    
    const data = { token, stripeId, email }

    axios.post(url, data)
        .then(response => {
        // console.log(response)
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
        return (
        <div >

            {/* <p>StripeId: {this.state.stripeId} GUY!!!! REMOVE:"CARDUPDATE.JS FE"THIS IS JUST USED FOR TESTING PROPS AND STATE</p> */}
        RETRIEVE Subscription

            <StripeCheckout
            label="Update Card"
            panelLabel="Update"
            token = {this.onToken}
<<<<<<< HEAD
            stripeKey = {"pk_test_PaDGT4uUhSf2yNoqbv08QU6X"}
=======
            stripeKey = {`${process.env.REACT_APP_STRIPE_KEY}`}
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b
            data-panel-label = {"Update you card details"}
            email={this.state.email}
            description={"Update your card details"}
            image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"

            />
        </div>
        )
    } 
}

