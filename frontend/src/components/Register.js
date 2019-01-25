import React from 'react';
import axios from 'axios';
import Payment from './Payment';

export default class Register extends React.Component {
  state = { isSubmitted: false }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }
  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const {  firstName, lastName, email, password, session, phone, deliveryAddress, dateJoined, numberOfOrders, stripeId, active, admin } = this.state
    const url = "http://localhost:5000/register"
    const data = { firstName, lastName, email, password, session, phone, deliveryAddress, dateJoined, numberOfOrders, stripeId, active, admin}

    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just registered for a cocktail subscription', error: null, isSubmitted: true})
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
        })
  }
  render() {
    const { error, message, email } = this.state
    return (
      <>
        <h2>Sign up for a Cocktail Subscription</h2>
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" onChange={this.handleInputChange}/><br/>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" onChange={this.handleInputChange}/><br/>
          <label htmlFor="email">email</label>
          <input type="email" id="email" onChange={this.handleInputChange}/><br/>
          <label htmlFor="password">Password: </label>
          <input type="string" id="password" onChange={this.handleInputChange}/><br/>
          {/* <label htmlFor="session">Session? - can probably get rid</label>
          <input type="string" id="session" onChange={this.handleInputChange}/><br/> */}
          <label htmlFor="phone">Phone number</label>
          <input type="number" id="phone" onChange={this.handleInputChange}/><br/>
          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input type="text" id="deliveryAddress" onChange={this.handleInputChange}/><br/>
          <button onClick={this.submitForm}>Join Up</button>
        </form>
          {this.state.isSubmitted && email && < Payment email={email}/>}
          { error && <p>{ error }</p> }
          { message && <p>{ message }</p>}
        </>
  )
}
}