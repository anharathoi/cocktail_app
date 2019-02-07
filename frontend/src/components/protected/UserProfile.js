import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Login from '../public/Login'

export default class UserProfile extends Component {
  state = {}
  
  componentDidMount () {
    const url = 'http://localhost:8000/me' // 
    const token = Cookies.get('token')
    if (token) {
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, deliveryAddress, admin} = resp.data
        // console.log(email)
        // const {admin} = user
        this.setState({email,firstName, lastName, phone, deliveryAddress, admin})
      })
      .catch( err => console.log(err) )
    }
  }
  
  clearToken = () => {
    this.setState({token: null})
  }

  render() {
    // console.log("This is userprofile props " + this.props.clearToken)
    return (
      <>
        <div>
          <h1>Hello {this.state.firstName}</h1>
          <p>First Name: {this.state.firstName}</p>
          <p>Last Name:  {this.state.lastName} </p>
          <p>Phone: {this.state.phone}</p>
          <p>Delivery Address: {this.state.deliveryAddress}</p>
          <p>Email: {this.state.email}</p>
        </div> 
      </>
    )
  }
}
