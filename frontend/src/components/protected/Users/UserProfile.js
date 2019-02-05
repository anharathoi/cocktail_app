import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.css'
import CardUpdate from './Cards/CardUpdate';
import Logout from '../../public/Logout'
import UpdateToMonthly from './Subscriptions/UpdateToMonthly';
import UpdateToQuarterly from './Subscriptions/UpdateToQuarterly';
// import AddSubscription from './Subscriptions/AddSubscription';
import ListCustomerCharges from './ListCustomerCharges';
import UpdateDetails from './UpdateDetails';

export default class UserProfile extends Component {
  state = { 
    email: this.email,
    subscriptionId: this.subscriptionId,
    selectedOption: this.selectedOption,
    stripeId: this.stripeId,
    message: null,
    error: null,
    
    updateDetailsState: false,
    addMonthlySubscription: this.addMonthlySubscription,
    addQuarterlySubscription: this.addQuarterlySubscription,
  }

  componentDidMount() {
    // const url = 'https://cocktail-app.now.sh/me' // PROD
    const url = 'http://localhost:5000/me' // 
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, } = resp.data

        this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, })
      })
      .catch(err => console.log(err) )
  }

  onToken = (token) => {
    const { stripeId, email } = this.state;
    // const url = 'https://cocktail-app.now.sh/updatecard' //PROD
    const url = 'http://localhost:5000/updatecard' // DEV
    const data = { token, stripeId, email }
    // console.log(data)

    axios.post(url, data)
        .then(response => {
        // console.log(response)
        // console.log(data);
        const { success } = response.data
            this.setState({ 
                success
            })
        })
        .catch ( err => {
          console.log(err.response)
        })
}  

// Function
updateCardDetails = (e) => {
  this.updateCardView(e)
}

updateDetails = () => {
  this.setState({ 
    updateDetailsState: true 
  });
}

// within the CardUpdate component
// onClick={(e) => props.updateCardDetails}

// Axios
updateCardView = (paymentSource) => {
  // const url = 'https://cocktail-app.now.sh/me' // PROD
  const url = 'http://localhost:5000/me' // DEV
  axios.get(url)
    .then(({ data }) => {
      this.setState((prevState) => {
        return {
          paymentSource: prevState.paymentSource
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}



/////////// ADDED THIS FFROM CARDUPDATE.JS SO I CAN PASS IT AS PROPS FUNCTIONAL STUFF - DELETE IF IT SCREWS  

// handleDelete = e => {
//   this.deleteEmployee(e)
// }

// deleteEmployee = id => {
//   axios.delete(`http://${hostURL || window.location.host}/api/employees/${id}`)
//     .then(({ data }) => {
//       this.setState((prevState) => {
//         return {
//           employees: prevState.employees.filter((employee) => {
//             return employee._id !== id
//           })
//         }
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
// //props to component
// handleDelete={this.handleDelete}

  // const url = 'https://cocktail-app.now.sh/me' // PROD
//     const url = 'http://localhost:5000/me' // 
//     axios.get(url)
//       .then (resp => {
//         const {
//           paymentSource
//         } = resp.data
//       }).catch (err => console.log(err))   
// }

  // componentDidUpdate(prevProps, prevState){

  //   if (prevProps.paymentSource !== this.props.paymentSource) {
  
  //   // const url = 'https://cocktail-app.now.sh/me' // PROD
  //   const url = 'http://localhost:5000/me' // 
  //     axios.get(url)
  //     .then ( resp => {
  //       const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId } = resp.data
  //       this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId })
  //     })
  //     .catch(err => console.log(err) )
  //   }
  // }
  // }
  //     this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId })

    // }).then((response) => {
    //   this.setState.({

      // }

    // <p>Card Type: {this.state.paymentSource[0].brand}</p>
    //         <p>Card on file: **** **** ****{this.state.paymentSource[0].last4}</p>
    //         <p>Expiry Month: {this.state.paymentSource[0].exp_month}</p>
    //         <p>Expiry Year: {this.state.paymentSource[0].exp_year}</p>
    // const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, defaultSource, last4, sourceBrand, exp_month, exp_year } = resp.data
    //       this.setState({email,firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, defaultSource, last4, sourceBrand, exp_month, exp_year })
    //       // console.log(resp.data)

          // When componentDidUpdate() is called, two arguments are passed: prevProps and prevState. This is the inverse of componentWillUpdate(). The passed values are what the values were, and this.props and this.state are the current values.
  // }
  
/////////////////////// BELOW WORKING OUT THE NEXT MONTH ////////////

  // displayNextMonth = () => {
  //   this.nextMonth()
  // }

  // nextMonth = () => { // initial thoughts for displaying the next month
  //   const current = new Date();

  //     current.setMonth(current.getMonth()+1)


  //   const now = new Date()
  //   // creates a new date object called 'now'
  //   if (now.getMonth() === 11) {
  //     //looks to see if it is december
  //     let current = new Date(now.getFullYear() + 1, 0 , 1)
  //     // if it's december then 
  //   } else {
  //     let current = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  //   }
  // }

////////////// ABOVE WORKING OUT THE NEXT MONTH ///////////





  // CHANGING / UPDATING THE CUSTOMERS SUBSCRIPTION
  quarterlyChange = () => {

    const { subscriptionId, email } = this.state;
    console.log("go go gadget choper")
    // // const url = "https://cocktail-app.now.sh/updatetoquarterlysubscription" // PROD
    const url = "http://localhost:5000/updatetoquarterlysubscription" //DEV
    const data =  {subscriptionId, email} // ideally the subscription number
    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just changed to a QUARTERLY cocktail subscription', error: null })
        // console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
  }
  
  monthlyChange = () => {
    const { subscriptionId, email } = this.state;
    console.log("go go gadget umbrella")
    // console.log(subscriptionId)
    // // const url = "https://cocktail-app.now.sh/updatetomonthlysubscription" // PROD
    const url = "http://localhost:5000/updatetomonthlysubscription" //DEV
    const data =  {subscriptionId, email}  // ideally the subscription number
    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just changed to a MONTHLY cocktail subscription', error: null })
        // console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
  }

  listCustomerOrders = () => {
    const {stripeId} = this.state
    // console.log(stripeId);

    // const url = "https://coctail-app.now.sh/list-customer-orders" // PROD
    const url = "https://localhost:5000/list-customer-orders" // DEV
    const data = {stripeId}
    axios.post(url, data)
      .then((result) => {
        console.log(result);
        // .then ( resp => {
        //   const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId } = resp.data
  
        //   this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId })
        // })
      })
      .catch(err => console.log(err) )


  }

cancelSubscription = () => {
  const { subscriptionId, email, selectedOption } = this.state;
  
  // // const url = "https://cocktail-app.now.sh/cancelsubscription" // PROD
  const url = "http://localhost:5000/cancelsubscription" //DEV
  const data =  { subscriptionId, email, selectedOption }  // ideally the subscription number
  
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just deleted your subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}

//// ADDING A SUBSCRIPTION - ADD MONTH && ADD QUARTERLY

// Monthly
addMonthlySubscription = () => {
  console.log("you just clicked on add monthly subscription");
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  console.log(this.state)
  // // const url = "https://cocktail-app.now.sh/add-monthly-subscription" // PROD
  const url = "http://localhost:5000/add-monthly-subscription" //DEV
  const data =  { stripeId, subscriptionId, email, selectedOption }  // ideally the subscription number
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just added a monthly subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}

// Quarterly
addQuarterlySubscription = () => {
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  
  console.log(this.state)
  // // const url = "https://cocktail-app.now.sh/add-quarterly-subscription" // PROD
  const url = "http://localhost:5000/add-quarterly-subscription" //DEV
  const data =  { stripeId, subscriptionId, email, selectedOption }  // ideally the subscription number
  
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just added a quarterly subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}
  
  render() {
    if (this.state.email) {
      // const subscriptionId = this.state
    return (

      <div>

        <div className="personal-info">
          <p>Hello {this.state.firstName} {this.state.lastName}</p>
          <p style={{fontStyle:"italic"}}>{this.state.email}</p>
          <p>These are the details you have provided to us:</p>
          <p>Street Address: {this.state.streetAddress}</p>
          <p>Suburb: {this.state.suburb}</p>
          <p>Postcode: {this.state.postcode}</p>
          <p>State: {this.state.ausState}</p>
          <input type="submit" value="Update Details" onClick={this.updateDetails} />
          { this.state.updateDetailsState ? <UpdateDetails /> : null }
          <hr/>
        </div>

        <div className="order-history">
            <p>list out all of their orders - use stripe</p>
            <ListCustomerCharges
              stripeId={this.state.stripeId} // it is HERE
            />
            <hr/>
        </div>

        <div className="plan-details">
            <h4>Your Subscription Details:</h4>
            <p>Your next delivery is expected between the 1st and 5th of 'moment.js - next month'</p>

            {/* Displays the users current subscription type */}
            { this.state.selectedOption === "monthlyFrequency" && <p>You have a monthly subscription</p>}
            { this.state.selectedOption === "quarterlyFrequency" && <p>You have a quarterly subscription</p>}
            { this.state.selectedOption === "no-subscription" && <p>You do not currently have a subscription</p>}

            {/* Gives the user the option to change to the other frequency plan */}
            { this.state.selectedOption === "monthlyFrequency" && 
            <UpdateToQuarterly
              email={this.state.email}
              subscriptionId={this.state.subscriptionId}
            />}

            { this.state.selectedOption === "quarterlyFrequency" && 
            <UpdateToMonthly 
              email={this.state.email}
              subscriptionId={this.state.subscriptionId} 
            />}

            { this.state.selectedOption === "no-subscription" && 
            <>
              <p>Re Subscribe to Bottle Bached</p>
              <button onClick={this.addMonthlySubscription}>Monthly Subscription</button>
              <button onClick={this.addQuarterlySubscription}>Quarterly Subscription</button>
            </>}

            {/* Gives the user the option to either Pause or Restart a Subscription */}
            {(this.state.selectedOption === "monthlyFrequency" || this.state.selectedOption === "quarterlyFrequency") && 
              <div>
                <h4>Pause your Subscription</h4>
                <button onClick={this.cancelSubscription}>Cancel Subscription</button>
              </div>}

            <p style={{fontSize:".8em"}}>This will stop you getting billed while still allowing you to keep your account information</p>
              
            
            <p>Your Next Subscription Payment will be for $87 || NUMBER? and will be charge on the 15th || BILLING DATE each month</p>
            
            <hr/>

          </div>
              

          
            


        

        <div className="payment-details">
            <h4> Your Card Details:</h4>
            <p>Card Type: {this.state.paymentSource[0].brand}</p>
            <p>Card on file: **** **** ****{this.state.paymentSource[0].last4}</p>
            <p>Expiry Month: {this.state.paymentSource[0].exp_month}</p>
            <p>Expiry Year: {this.state.paymentSource[0].exp_year}</p>
            
            <CardUpdate
              updateCardView={this.updateCardView}
              onToken={this.onToken}
              email={this.state.email}
            />

            <hr/>
        </div>

        <Logout/>

      </div>
    )}
     else  {
      return (
       <div style={{paddingTop: '40px'}}>
         Please Log in to see details
         <p>{this.state.resp}</p>
         
       </div>
      )
  }

}

}