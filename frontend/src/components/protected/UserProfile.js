import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export default class UserProfile extends Component {
  state = {}
  componentDidMount (){
    // const url = 'https://cocktail-app.now.sh/me' // PROD

    const url = 'http://localhost:5000/me' // 
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
        this.setState({email,firstName, lastName, phone, deliveryAddress})
      })
      .catch( err => console.log(err) )
  }
    // clearToken = () => {
    //   this.setState({token: null})
    // }

    render() {
      // console.log("This is userprofile props " + this.props.clearToken)
      if(this.props.token){
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
      else {
        return (
          <div style={{paddingTop: '40px'}}>
            Please Log in to see details
          </div>
        )
  }
}
}
