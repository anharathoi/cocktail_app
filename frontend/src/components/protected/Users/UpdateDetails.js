import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.css'

export default class UpdateDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      isSubmitted: false,
      email: this.email,
      firstName: "", 
      lastName: "",  
      streetAddress: "", 
      suburb: "", 
      postcode: "", 
      ausState: ""
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_DOMAIN}/me`
    console.log(url)
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState } = resp.data
        this.setState({email, firstName, lastName, phone, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState })
      })
      .catch(err => console.log(err) )
  }

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }

  submitForm = (e) => {
    e.preventDefault()
    const {  firstName, lastName, email, streetAddress, suburb, postcode, ausState,  stripeId, error, message } = this.state
  
    const url = `'${process.env.REACT_APP_DOMAIN}/update-details:email'`
    const data = { firstName, lastName, email, streetAddress, suburb, postcode, ausState,  stripeId, error, message }
    
    axios.put(url, data)
      .then(resp => {
        this.setState({ message: 'You have successfully updated your details!', error: null, isSubmitted: true })
        console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
      this.setState({
        isSubmitted: true
      })
  }

  render() {
    const { firstName, lastName, streetAddress, suburb, postcode, ausState, error, message, email } = this.state
    
    if (this.state.isSubmitted === false) {
    return (
    <>
      <p>Update your details</p>  
      <p>Just update what's changed.</p>
      <form>

        <input type="hidden" id="email" defaultValue={email} onChange={this.handleInputChange}/><br/>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" defaultValue={firstName} onChange={this.handleInputChange}/><br/>

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" defaultValue={lastName} onChange={this.handleInputChange}/><br/>

        <label htmlFor="streetAddress">Street Address:</label>
        <input type="text" id="streetAddress" defaultValue={streetAddress} onChange={this.handleInputChange}/><br/>

        <label htmlFor="suburb">Suburb:</label>
        <input type="text" id="suburb" defaultValue={suburb} onChange={this.handleInputChange}/><br/>

        <label htmlFor="postcode">Postcode:</label>
        <input type="number" id="postcode" defaultValue={postcode} onChange={this.handleInputChange}/><br/>

        <label htmlFor="ausState">State:</label>
        <input type="text" id="ausState" defaultValue={ausState} onChange={this.handleInputChange}/><br/>

        <button onClick={this.submitForm}>Submit</button>
      </form>

       
        {this.state.isSubmitted && email && <div>yep you did it!</div> }
                  
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p>}
    </>
  )}
  else {
    return (
      <p>Your details have been updated</p>
    )
  }
}
}

  