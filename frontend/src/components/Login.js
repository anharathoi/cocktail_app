import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar'

import { Redirect } from 'react-router-dom'


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
        // console.log(resp)
        const { admin } = resp.data
        this.setState({ admin: admin, message: 'well done buddy you just LOGGED IN for a cocktail subscription', error: null, email: email, loggedIn: true })
      })
      .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
      })
    }
    logoutHandle = (e) => {
      e.preventDefault()
      const url = "http://localhost:5000/logout"
      axios.get(url)
      .then(resp => {
        this.setState({ message: 'You have logged out', error: null, email: null, loggedIn: false })
      })
    }

    render() {
      const { error, message} = this.state
      
      if (this.state.admin) {
        return <Redirect to="/admin" />
      } 
      else if (this.state.admin === false) {
        return <Redirect to="/userprofile" />
      }
      else {
      return (
        <>
          <Navbar/>
          <div style={{paddingTop: '40px'}}>
              <h2>Sign In</h2>
              <form>
                <label htmlFor="email">email</label>
                <input type="email" id="email" onChange={this.handleInputChange}/><br/>
                <label htmlFor="password">Password: </label>
                <input type="string" id="password" onChange={this.handleInputChange}/><br/>
                <button onClick={this.submitForm}>Login</button>
              </form>
              {this.state.loggedIn && <button onClick={this.logoutHandle}>Logout</button>}
              { error && <p>{ error }</p> }
              { message && <p>{ message }</p>}
          </div>
        </>
      )
  }
}
}