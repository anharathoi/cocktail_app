import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router} from 'react-router-dom'
// @flow
import StripeProvider from './components/public/Provider';
import injectStripe from './components/public/inject';
import Elements from './components/public/Elements';
import Element from './components/public/Element';
import PaymentRequestButtonElement from './components/public/PaymentRequestButtonElement';

// Define Elements, and register their implied token / source types for
// automatic token / source creation.

// Card
const CardElement = Element('card', {
  impliedTokenType: 'card',
  impliedSourceType: 'card',
});

// Split Fields
// Note: we only register the CardNumberElement for split fields so that we have
// a unique Element to infer when calling `wrappedCreateToken` or `wrappedCreateSource`.
const CardNumberElement = Element('cardNumber', {
  impliedTokenType: 'card',
  impliedSourceType: 'card',
});
const CardExpiryElement = Element('cardExpiry');
const CardCVCElement = Element('cardCvc');
const PostalCodeElement = Element('postalCode');

// IBAN
const IbanElement = Element('iban', {
  impliedTokenType: 'bank_account',
  impliedSourceType: 'sepa_debit',
});

// iDEAL Bank
const IdealBankElement = Element('idealBank', {impliedSourceType: 'ideal'});

export {
  StripeProvider,
  injectStripe,
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
