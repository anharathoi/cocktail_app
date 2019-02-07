import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const CardUpdate = (props) => {
  // console.log(`CardUpdate properties = ${props}`)
  
  return ( 
        <StripeCheckout
          label="Update Card"
          panelLabel="Update"
          token = {props.onToken}
          stripeKey = {`${process.env.REACT_APP_STRIPE_KEY}`}
          data-panel-label = {"Update you card details"}
          email={props.email}
          description={"Update your card details"}
          image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
          />
  ) 
}

export default CardUpdate
