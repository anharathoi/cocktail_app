import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// const stripe = require("stripe")(REACT_APP_STRIPE_KEY);
// require('dotenv')(;
// require('dotenv').config()
export default class CardUpdate extends Component {
//   state = { 
//     update: false
//   }
  onSource = (source) => {
    // const url = 'https://cocktail-app.now.sh/api/stripe/updatecard' //PROD
    const url = 'http://localhost:5000/api/stripe' // DEV
    const data = { source }

    axios.post(url, data)
        .then(response => {
        console.log(response)
        // const { success } = response.data
            // this.setState({ 
            //     success
            // })
        })
        .catch ( err => {
        console.log(err.response)
        })
    }  
  render() {
    // if (this.state.success) {
    //   return <Redirect to="/UserProfile" />
    // } 
    // else {
    return (
      <div style={{paddingTop: '40px'}}>
      UPDATE YOUR CARD INFO
        <StripeCheckout
          token = {this.onSource}
          stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
          data-panel-label = {"Update you card details"}
          />
      </div>
    )
} 
}
//   data-email = {this.state.email}
// }

// FROM TUTORIAL

// const changeCreditCardMutation =  

//     axios.post changeCreditCardMutation(source) {
//         changeCreditCardMutation(source: $source) {
//             id,
//             email, 
//             type
//         }
//     }

//     const url = 'http://localhost:5000/api/stripe/updatecard' // DEV
//     const data = { source }

//     axios.post(url, data)
//         .then(response => {
//         console.log(response)
//         // const { success } = response.data
//             // this.setState({ 
//             //     success
//             // })
//         })
//         .catch ( err => {
//         console.log(err.response)
//         })
//     }  

// //     // he has create a new mutation so he needs to set the types - mutations are cud methods. not r
// //     //

    
//     export class CardUpdate extends Component {
//       render() {
//         return (
//             <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
//             mutation = {changeCreditCardMutation}>
//           <StripeCheckout
//             token={async token => {
//                 const response = await MutationEvent({
//                     variables: { source: token.id }
//                 })
//                 console.log(response)
//             }}
// //             stripeKey={process.env.REACT_APP_STRIPE_KEY}
//                 stripeKey={"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
//             />
//         )}
//       </Mutation>
//       );
//     }
// // }
// // // const stripe = require("stripe")(REACT_APP_STRIPE_KEY);
 

// //     // he then goes to his schema - and adds

// //     // his schema - graphql 

// //     // export interface ChangeCreditCardMutation_changeCreditCard {
// //     //     id: string;
// //     //     email: string;
// //     //     type: String;
// //     // }

// //     // export interface ChangeCreditCardMutation {
// //     //     changeCreditCard: ChangeCreditCardMutation_changeCreditCard | null;
// //     // }

// //     // export interface ChangeCreditCardMutationVariables {
// //     //     source: string
// //     // }

// //     // //up above he imports his schemas:
// //     // import {
// //     //     ChangeCreditCardMutation,
//     //     ChangeCreditCardMutationVariables
//     // } from "../../schemaTypes";