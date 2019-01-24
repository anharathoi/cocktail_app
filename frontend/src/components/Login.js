import React, { Component } from 'react';
import axios from 'axios';
import Payment from './Payment';

export default class Login extends Component {
  state = { }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }
  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const { email, password } = this.state
    const url = "http://localhost:5000/login"
    const data = { email, password }
    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just LOGGED IN for a cocktail subscription', error: null, email: email })
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
            <h2>Sign In</h2>
            <form>
              <label htmlFor="email">email</label>
              <input type="email" id="email" onChange={this.handleInputChange}/><br/>
              <label htmlFor="password">Password: </label>
              <input type="string" id="password" onChange={this.handleInputChange}/><br/>
              <button onClick={this.submitForm}>Join Up</button>
            </form>
            { email && <Payment email={email} /> }
            { error && <p>{ error }</p> }
            { message && <p>{ message }</p>}
          </>
      )
  }
}