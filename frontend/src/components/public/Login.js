import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Logout from '../Logout'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default class Login extends Component {
  state = { }

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
    // headers: { authorization: localStorage.getItem('token') }
    
    // const url = "https://cocktail-app.now.sh/login" // PROD
    const url = "http://localhost:5000/login" // DEV
    const data = { email, password }
    axios.post(url, data)
      .then(resp => {
        const { user, token } = resp.data
        const { admin } = user
        // const admin = user.admin
        // console.log(admin)// console logs false
        Cookies.set('token', token)
        this.setState({  admin:admin, message: 'well done buddy you just LOGGED IN for a cocktail subscription', error: null, email: email, loggedIn: true})
      })
      .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
      })
    }
   clearToken = () => {
     this.setState({token: null})
   }

    render() {
      const { error, message} = this.state

      if (this.state.admin) {
        return <Redirect to="/admin" />
      } 
      else if (this.state.admin === false) {
        return <Redirect to="/userprofile"/>
      }
      else {
        if(!this.state.token){
          return (
            <>
              {/* <Navbar/> */}
              <div style={{paddingTop: '40px'}}>
                  <h2>Sign In</h2>
                  <form>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="password">Password: </label>
                    <input type="string" id="password" onChange={this.handleInputChange}/><br/>
                    <button onClick={this.submitForm}>Login</button>
                  </form>
                  { message && <p>{ message }</p>}
                  { error && <p>{ error }</p> }
              </div>
            </>
          )
        } else {   
            return (
              <Logout clearToken={this.clearToken}/>
            ) 
        }
      }
    }
}