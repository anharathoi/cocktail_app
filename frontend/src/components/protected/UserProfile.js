import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '../Logout'

export default class UserProfile extends Component {
  state = {}
  componentDidMount (){
    const url = 'https://cocktail-app.now.sh/me'
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, deliveryAddress} = resp.data
        // console.log(email)
        // const {admin} = user
        this.setState({email,firstName, lastName, phone, deliveryAddress })
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
