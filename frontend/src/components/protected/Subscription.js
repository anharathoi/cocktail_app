import React, { Component } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import Cookies from 'js-cookie';
import axios from 'axios';
import CancelSubscription from './CancelSubscription';
import UpdateSubscription from './UpdateSubscription';
import RetrieveSubscription from './RetrieveSubscription';
import AddSubscription from './AddSubscription';


export default class Subscription extends Component {
//   state = { }
//   constructor(props) {
//     super(props)
//     this.state = { 
//       isSubmitted: false,
//       frequencyOptions: []
//     }
//   }

  //I am reusing this method in component did mount a lot - we should make it DRY - turn it into a function, so that we don't waste so much space in coding the same
  componentDidMount = () => {
    const url = 'http://localhost:5000/me' // 
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
          console.log(resp)
        const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption } = resp.data
        this.setState({email,firstName, lastName, phone, deliveryAddress, stripeId, selectedOption})
      })
      .catch( err => console.log(err) )
  }
  handleFrequencyChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };
  
//   onToken = (token) => {
//     // const url = 'https://cocktail-app.now.sh/removesubscription' //PROD
//     const stripeId = this.props.stripeId
//     const email = this.props.email
//     const url = 'http://localhost:5000/removesubscription' // DEV
//     const data = { token, stripeId, email }

//     axios.post(url, data)
//         .then(response => {
//         // console.log(response)
//         const { success } = response.data
//             this.setState({ 
//                 success
//             })
//         })
//         .catch ( err => {
//         console.log(err.response)
//         })
//     }  
  render() {
    //   if (this.state.selectedOption === "monthlyFrequency")

    const { error, message, email, selectedOption } = this.state
    return (
        <div >
        {/* <CancelSubscription/>
        <RetrieveSubscription/>
        {/* <UpdateSubscription/> */}
        {/* <AddSubscription/> */}
{/*          */}
        <h4>Manage Your Subscription:</h4>      
        <label>Pause Subscription</label><br/>
        <button onClick={this.submitForm}>Pause</button><br/>
        {/* <StripeCheckout
          label="Switch to a Quarterly Subscription"
          panelLabel="Update"
          token = {this.onToken}
          stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
          data-panel-label = {"Update you card details"}
          email={this.state.email}
          description={"Update your card details"}
          image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"

          /> */}
        {/* <label>Switch to a Quarterly Subscription</label><br/>
        <button onClick={this.submitForm}>Switch</button> */}
         {/* */} 

         
      </div>
    // )
    // else if (this.state.selectedOption === "quarterlyFrequency")
    // return (
        
    //   <div >
    //     <h4>Manage Your Subscription:</h4>
    //     <label>Pause Subscription</label><br/>
    //     <button onClick={this.submitForm}>Pause</button><br/>

    //     {/* <StripeCheckout
    //       label="Switch to a Monthly Subscription"
    //       panelLabel="Update"
    //       token = {this.onToken}
    //       stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
    //       data-panel-label = {"Update you card details"}
    //       email={this.state.email}
    //       description={"Update your card details"}
    //       image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
    //       /> */}

    //     <label>Switch to a Monthly Subscription</label><br/>

    //     <button onClick={this.submitForm}>Switch</button>
        

         
    //   </div>
    // )
    // else return (
    //     <div >
    //         <h4>Restart Your Subscription:</h4>
    //         <form>

    //             <div className="form-check">
    //                 <label htmlFor="frequency">Monthly Frequency</label>
    //                 <input type="radio" id="frequency1" value="monthlyFrequency" name="frequency" checked={this.state.selectedOption === "monthlyFrequency"} onChange={this.handleFrequencyChange}/>
    //             </div>

    //             <div className="form-check">
    //                 <label htmlFor="frequency">Quarterly Frequency</label>
    //                 <input type="radio" id="frequency2" value="quarterlyFrequency" name="frequency" checked={this.state.selectedOption === "quarterlyFrequency"} onChange={this.handleFrequencyChange}/>
    //             </div>

    //             <button onClick={this.submitForm}>Join Up</button>
    //             <p>GUY - CREDIT CARD DETAILS? - THIS MIGHT REQUIRE A TOKEN AGAIN</p>
    //         </form>   
    //          {/* <StripeCheckout
    //       label="Switch to a Monthly Subscription"
    //       panelLabel="Update"
    //       token = {this.onToken}
    //       stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
    //       data-panel-label = {"Update you card details"}
    //       email={this.state.email}
    //       description={"Update your card details"}
    //       image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
    //       /> */}
    //     </div>
      )
  } 
}
