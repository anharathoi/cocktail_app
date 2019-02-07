// CardSection.js
import React from 'react';
import {CardElement} from 'react-stripe-elements';
import PaymentRequestForm from './PaymentRequestForm'


class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
        <PaymentRequestForm/>
      </label>
    );
  }
}

export default CardSection;