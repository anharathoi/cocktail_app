import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '../Logout'
import CardUpdate from '../protected/CardUpdate';

export default class UserProfile extends Component {
  state = {}
  componentDidMount (){
    // const url = 'https://cocktail-app.now.sh/me' // PROD

    const url = 'http://localhost:5000/me' // 
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
        // id: id,
        // email: email,
        // type: type
        //this is the me query he was talking about - so i 
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, ccLast4 } = resp.data
        // console.log(email)
        // const {admin} = user
        this.setState({email,firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, ccLast4 })
      })
      .catch( err => console.log(err) )
  }
  
  // getData = () => {
    
  // }
    render() {
    if(this.state.email){
      return (
      <>
        <div>
          hello man
          <p>First Name: {this.state.firstName}</p>
          <p>Last Name:  {this.state.lastName} </p>
          <p>Phone: {this.state.phone}</p>
          <p>Delivery Address: {this.state.deliveryAddress}</p>
          <p>Email: {this.state.email}</p>
          <p>StripeId: {this.state.stripeId}</p>
          <p>Last 4 numbers of card on file: {this.state.ccLast4}</p>

          { this.state.selectedOption === "monthlyFrequency" && <p>You have a monthly subscription</p>}
          { this.state.selectedOption === "quarterlyFrequency" && <p>You have a quarterly subscription</p>}

          <CardUpdate/>

          <Logout/>
        </div>
        
      </>
      )
    }
    else {return (
      <div style={{paddingTop: '40px'}}>
        Please Log in to see details
        <p>{this.state.resp}</p>
        
      </div>
    )
  }
}
}
