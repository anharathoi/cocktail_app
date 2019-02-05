import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.css'
export default class UpdateDetails extends Component {
    state = { 
      isSubmitted: false,
      
    }

  componentDidMount() {
    // const url = 'https://cocktail-app.now.sh/me' // PROD
    const url = 'http://localhost:5000/me' // 
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
        const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, } = resp.data

        this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, })
      })
      .catch(err => console.log(err) )
  }

// GUY THIS IS A CLASS - NOT FUNCTIONAL - YOU WILL NEED TO DRAW
  // const {firstName, lastName, email,  streetAddress, suburb, postcode, ausState,

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }

  submitForm = (e) => {
    e.preventDefault()
    const {  firstName, lastName, email, deliveryAddress, streetAddress, suburb, postcode, ausState,  stripeId } = this.state
  
    // // const url = "https://cocktail-app.now.sh/update-details" // PROD
    const url = "http://localhost:5000/update-details" //DEV

    const data = { firstName, lastName, email, deliveryAddress, streetAddress, suburb, postcode, ausState,  stripeId }
    const config = { headers: {'Content-Type': 'multipart/form-data' }}
    axios.put(url, data, config)
      .then(resp => {
        this.setState({ message: 'well done buddy you just updated your details', error: null, isSubmitted: true })
        console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
  }

  render() {
    const { firstName, lastName, streetAddress, suburb, postcode, ausState, error, message, email } = this.state
    // if (this.state.success) {
    //   // return <Redirect to="/UserProfile" />
    //   <p>Howdy Cowboy!!!</p>
    // } 
    // else {
    console.log(this.state);
    return (
  
    <div>
      <p>This is where we update those details y'all.</p>  <p>Just update what's changed.</p>
      <form>

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
        {/* {this.state.isSubmitted && email && <Payment email={email} selectedOption={selectedOption} />} */}
                  
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p>}

    </div>
  )
}
}


// export default class Payment extends Component {
//   state = { 
//     payment: false
//   }

//   onToken = (token) => {
//     // props are being passed down from the Register.js component
//     const email = this.props.email
//     const selectedOption = this.props.selectedOption
//     //
//     const data = { token, email, selectedOption,}
//     // const url = 'https://cocktail-app.now.sh/api/stripe' // PROD
//     const url = 'http://localhost:5000/api/stripe' // PROD

//     axios.put(url[, data[, config]])

//     axios.update(url, data)
//       .then( response => {
//         console.log(response.data)
//         const { success } = response.data
//         this.setState({ 
//           success
//         })
//       })
//       .catch ( err => {
//         console.log(err.response)
//       })
//   }  

  