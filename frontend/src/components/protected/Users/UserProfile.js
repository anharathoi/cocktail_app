import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.css'
import CardUpdate from './Cards/CardUpdate';
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
    showOrders: false,
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_DOMAIN}/me`
    console.log(url)
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
        const { email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, orderList } = resp.data

        this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, orderList })
      })
      .catch(err => console.log(err) )
  }

  onToken = (token) => {
    const { stripeId, email } = this.state; 
    const url =  `${process.env.REACT_APP_DOMAIN}/updatecard` 
    const data = { token, stripeId, email }
    // console.log(`100  - UserProfile.js - update card  ${data}`)

    axios.post(url, data)
        .then(response => {
          console.log(`53  - UserProfile.js - update card  ${response}`)
        
        const { success } = response.data
            this.setState({ 
                success
            })
        })
        .catch ( err => {
          console.log(err.response)
        })
}  

updateCardDetails = (e) => {
  this.updateCardView(e)
}

updateDetails = () => {
  this.setState({ 
    updateDetailsState: true 
  });
}

toggleOrders = () => {
  this.setState.showOrders = true
}

/**
|--------------------------------------------------
| UPDATING TO A QUARTERLY SUBSCRIPTION - CHANGING FROM MONTHLY
|--------------------------------------------------
*/

updateQuarterlySubscription = () => {
  const {  email, subscriptionId, } = this.state
  console.log(this.state);
  console.log("this is where it is not working");

  const url =  `${process.env.REACT_APP_DOMAIN}/updatetoquarterlysubscription`
  const data = { email, subscriptionId }

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
    const url =  `${process.env.REACT_APP_DOMAIN}/updatetomonthlysubscription`
    const data =  {subscriptionId, email}  
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
    const { stripeId, email, orderList } = this.state
    console.log(this.state)

    const url =  `${process.env.REACT_APP_DOMAIN}/list-customer-orders`
    const data = { stripeId, email, orderList }
    // console.log(data);

    axios.post(url, data)
    .then(resp => {
      const orders = resp.data.data 
      console.log(resp)
      this.setState({ orders, message: 'These are all your orders', error: null })
    })
    
    .catch(err => {
      console.log(err.response)
      if (err.response === 403) {
        this.setState({ error: 'Nope!', message: null})
      }
    })
  }

  timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  moneyConverter = (Money) => {
    const converted = parseInt(Money) 
    const numstr = converted / 100
    return '$' + numstr
  }

cancelSubscription = () => {
  const { subscriptionId, email, selectedOption } = this.state;
  
  const url =  `${process.env.REACT_APP_DOMAIN}/cancelsubscription`
  const data =  { subscriptionId, email, selectedOption }  
  
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

/**
|--------------------------------------------------
| ADDING A SUBSCRIPTION - ADD MONTH AND ADD QUARTERLY
|--------------------------------------------------
*/


addMonthlySubscription = () => {
  console.log("you just clicked on add monthly subscription");
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  // console.log(this.state)
  const url =  `${process.env.REACT_APP_DOMAIN}/add-monthly-subscription`
  const data =  { stripeId, subscriptionId, email, selectedOption }  
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

addQuarterlySubscription = () => {
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  
  console.log(this.state)
  const url =  `${process.env.REACT_APP_DOMAIN}/add-quarterly-subscription`
  const data =  { stripeId, subscriptionId, email, selectedOption }  
  
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
    
    return (
      <>
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
           
          <button onClick={this.listCustomerOrders}>View all your orders</button>
           
          {this.state.orders && 
              <>
                <h4>Your Orders:</h4>
                  <table className="customers-table pure-table pure-table-horizontal">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th> 
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.orders.map(order => 
                          { return (
                          <tr>
                            <td>{this.timeConverter(order.created)}</td>
                            <td>{this.moneyConverter(order.amount)}</td>  
                            <td>Bottle Batched Subscription</td>
                          </tr>)
                        }
                        )}
                        </tbody>
                  </table>
                </>
          }
        </div>

        <div className="plan-details">
            <h4>Your Subscription Details:</h4>
            <p>Your next delivery is expected between the 1st and 5th of March</p>

            {/* Displays the users current subscription type */}
            { this.state.selectedOption === "monthlyFrequency" && <p>You have a monthly subscription</p>}
            { this.state.selectedOption === "quarterlyFrequency" && <p>You have a quarterly subscription</p>}
            { this.state.selectedOption === "no-subscription" && <p>You do not currently have a subscription</p>}

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
              
            <p>Your Next Subscription Payment will be for $87 and will be charged on the 8th of March</p>
            
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
        </div>
      </>
    )}
     else  {
      return (
       <div style={{paddingTop: '40px'}}>
         Please Log in to see details
         <p>{this.state.resp}</p>
         
       </div>
      )}
  }
}