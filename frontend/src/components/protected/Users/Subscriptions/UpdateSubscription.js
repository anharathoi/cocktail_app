// import React, { Component } from 'react';
// // import StripeCheckout from 'react-stripe-checkout';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// export default class UpdateSubscription extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { 
//           isSubmitted: false,
//           frequencyOptions: []
//         }
//       }

//     //I am using this cdm a lot - can we DRY it up?

//     componentDidMount = () => {
//         const url = 'http://localhost:5000/me' // 
//         const token = Cookies.get('token')
//           axios.get(url, {
//             headers: {
//               'Authorization': `bearer ${token}`
//             },
//           })
//           .then ( resp => {
//               console.log(resp)
//             const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption } = resp.data
//             this.setState({email,firstName, lastName, phone, deliveryAddress, stripeId, selectedOption})
//           })
//           .catch( err => console.log(err) )
//       }

//       componentDidMount = () => {
//         // const url = 'https://cocktail-app.now.sh/me' //PROD
//         const url = 'http://localhost:5000/me' // DEV
//           axios.get(url)
//           .then(res => res.json())
//                 .then(data => {
//                     this.setState({
//                         selectedFrequency: data.frequencyOptions	
//                     });
//                 });
//       }

// handleFrequencyChange = (e) => {
//     this.setState({
//       selectedOption: e.target.value
//     });
//   };

//   handleInputChange = (e) => {
//     const { value, id } = e.currentTarget;
//     this.setState({ [id]: value})
//   }

//   submitForm = (e) => {
//     e.preventDefault()
//     const { selectedOption } = this.state
  
//     // // const url = "https://cocktail-app.now.sh/updatetoquarterlysubscription" // PROD
//     const url = "http://localhost:5000/updatetoquarterlysubscription" //DEV

//     const data = { selectedOption }

//     axios.post(url, data)
//       .then(resp => {
//         this.setState({ message: 'well done buddy you just registered for a cocktail subscription', error: null, isSubmitted: true })
//         console.log(resp)
//       })
//       .catch(err => {
//           console.log(err.response)
//           if (err.response === 403) {
//             this.setState({ error: 'Nope!', message: null})
//           }
//       })
//   }


//     render() {
//     const { error, message, selectedOption } = this.state
//         return (
//         <div >
//             <hr/>

//         UPDATE Subscription

//         <form>
//           <div className="form-check">
//             <label htmlFor="frequency">Monthly Frequency</label>
//             <input type="radio" id="updatefrequency1" value="monthlyFrequency" name="frequency" checked={this.state.selectedOption === "monthlyFrequency"} onChange={this.handleFrequencyChange}/>
//           </div>

//           <div className="form-check">
//             <label htmlFor="frequency">Quarterly Frequency</label>
//             <input type="radio" id="updatefrequency2" value="quarterlyFrequency" name="frequency" checked={this.state.selectedOption === "quarterlyFrequency"} onChange={this.handleFrequencyChange}/>
//           </div>

        
//         </form>

//         {/* {selectedOption={selectedOption} &&   <button onClick={this.submitForm}>Update Subscription</button> } */}
          
//         { error && <p>{ error }</p> }
//         { message && <p>{ message }</p>}

//         </div>
//         )
//     } 
// }

