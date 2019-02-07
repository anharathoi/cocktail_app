import React, { Component } from 'react';
import axios from 'axios';
// import Logout from './Logout'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Form.css'

export default class Login extends Component {
  state = { message: ''}

  componentDidMount(){
    const token = Cookies.get('token')
    if (token) {
      this.setState({token})
    }
  }

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }

  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const { email, password } = this.state
    
    const url =  `${process.env.REACT_APP_DOMAIN}/login`
    const data = { email, password }
    axios.post(url, data)
      .then(resp => {
        console.log(resp)
        const { user, token } = resp.data
        const { admin } = user
        // console.log(admin)
        Cookies.set('token', token)
        this.setState({  admin:admin, message: 'well done buddy you just LOGGED IN for a cocktail subscription', error: null, email: email, loggedIn: true})
        this.props.setToken(token)
        this.props.setAdmin(admin)
        this.props.setPayment()
        // console.log("props from login " + this.props.setAdmin)
      })
      .catch(err => {
        this.setState({ error: 'Invalid Details!', message: "Please try again"})
      })
    }

    render() {
      // console.log(this.state)
      const { error, message} = this.state

      if (this.state.admin) {
        return <Redirect to="/admin" />
      } 
      else if (this.state.admin === false) {
        return <Redirect to="/userprofile"/>
      }
      else {
        if(!this.props.token){
          return (
            <>
              <div className="site-form login">
                  <h2>Sign In</h2>
                  <form >
                    <div>
                      <label htmlFor="email">email</label>
                      <input type="email" id="email" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                      <label htmlFor="password">Password: </label>
                      <input type="password" id="password" onChange={this.handleInputChange}/>
                    </div>
                    <button onClick={this.submitForm}>Login</button>
                  </form>
                  { error && <p style={{color: '#ed4337'}}>{ error }</p> }
                  { message && <p style={{color: '#ed4337'}}>{ message }</p>}
              </div>
            </>
          )
        } else {   
            return (
              <p>You're currently Logged in</p>
            ) 
        }
      }
    }
}