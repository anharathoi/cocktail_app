import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class Subscription extends Component {

  componentDidMount = () => {
    const url =  `${process.env.REACT_APP_DOMAIN}/me`
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
 
  render() {

    const { error, message, email, selectedOption } = this.state
    return (
      <>
        <h4>Manage Your Subscription:</h4>      
        <label>Pause Subscription</label><br/>
        <button onClick={this.submitForm}>Pause</button><br/> 
      </>
      )
  } 
}
