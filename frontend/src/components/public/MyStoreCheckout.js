import React from 'react';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
import('./MyStoreCheckout.css')

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm nameClass="cardform" />
      </Elements>
    );
  }
}

export default MyStoreCheckout;