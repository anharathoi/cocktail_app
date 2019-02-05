import React from 'react';
import axios from 'axios';
import Payment from './Payment';
<<<<<<< HEAD
=======
// import Frequency from './Frequency';
import Cookies from 'js-cookie';
import './Form.css'
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isSubmitted: false,
      frequencyOptions: []
    }
  }
<<<<<<< HEAD

  componentDidMount = () => {
    // const url = 'https://cocktail-app.now.sh/me' //PROD
    const url = 'http://localhost:5000/me' // DEV
      axios.get(url)
      .then(res => res.json())
			.then(data => {
				this.setState({
					selectedFrequency: data.frequencyOptions	
				});
			});
=======
  //thinking i may have to add in all of the fields within this.state.  and then below set the state of each of these components in this.setState.
  
  componentDidMount = () => {
    // const url = 'https://cocktail-app.now.sh/me' //PROD
    const url = 'http://localhost:5000/me' // DEV
    const token = Cookies.get('token')
    // console.log("this is token " + token)
    if(token){
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then(resp => {
        // const {token} = resp.data
        this.setState({
          selectedFrequency: resp.data.frequencyOptions
        });
      });
    }
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde
  }

  handleFrequencyChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }

  submitForm = (e) => {
    e.preventDefault()
    const {  firstName, lastName, email, password, session, phone, deliveryAddress, streetAddress, suburb, postcode, ausState, dateJoined, numberOfOrders, stripeId, active, admin, selectedOption } = this.state
  
    // // const url = "https://cocktail-app.now.sh/register" // PROD
    const url = "http://localhost:5000/register" //DEV

    const data = { firstName, lastName, email, password, session, phone, deliveryAddress, streetAddress, suburb, postcode, ausState, dateJoined, numberOfOrders, stripeId, active, admin, selectedOption }
    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just registered for a cocktail subscription', error: null, isSubmitted: true })
        const {token} = resp.data
        Cookies.set('token', token)
        this.props.setToken(token)
        // console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
  }

  
  render() {
    const { error, message, email, selectedOption } = this.state
    return (
<<<<<<< HEAD
      <div id="register" style={{paddingTop: '40px'}}>
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
          
          <label htmlFor="phone">Phone number</label>
          <input type="number" id="phone" onChange={this.handleInputChange}/><br/>
          
          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input type="text" id="deliveryAddress" onChange={this.handleInputChange}/><br/>

          <label htmlFor="streetAddress">Street Address:</label>
          <input type="text" id="streetAddress" onChange={this.handleInputChange}/><br/>

          <label htmlFor="suburb">Suburb:</label>
          <input type="text" id="suburb" onChange={this.handleInputChange}/><br/>

          <label htmlFor="postcode">Postcode:</label>
          <input type="number" id="postcode" onChange={this.handleInputChange}/><br/>

          <label htmlFor="ausState">State:</label>
          <input type="text" id="ausState" onChange={this.handleInputChange}/><br/>



          <div className="form-check">
            <label htmlFor="frequency">Monthly Frequency</label>
            <input type="radio" id="frequency1" value="monthlyFrequency" name="frequency" checked={this.state.selectedOption === "monthlyFrequency"} onChange={this.handleFrequencyChange}/>
          </div>
=======
      <div>
        <div className="site-form registration" id="register" style={{paddingTop: '40px'}}>
          <h2>Sign up for a Cocktail Subscription</h2>
          <form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input type="email" id="email" onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="string" id="password" onChange={this.handleInputChange}/>
            </div>
            
            {/* <label htmlFor="session">Session? - can probably get rid</label>
            <input type="string" id="session" onChange={this.handleInputChange}/> */}
            <div>
              <label htmlFor="phone">Phone number</label>
              <input type="number" id="phone" onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="deliveryAddress">Delivery Address:</label>
              <input type="text" id="deliveryAddress" onChange={this.handleInputChange}/>
            </div>
            

            {/* <Frequency
            title={'What up - how often you want these cocktails?!?'}
            setName={'frequency'} 
            controlFunc={this.handleFrequencySelection}
            type={'radio'}
            options={this.state.frequencyOptions}
            selectedOptions={this.state.frequencyOptions}
            /> */}

            <div className="form-check">
              <label htmlFor="frequency">Monthly Frequency</label>
              <input type="radio" id="frequency1" value="monthlyFrequency" name="frequency" checked={this.state.selectedOption === "monthlyFrequency"} onChange={this.handleFrequencyChange}/>
            </div>
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde

            <div className="form-check">
              <label htmlFor="frequency">Quarterly Frequency</label>
              <input type="radio" id="frequency2" value="quarterlyFrequency" name="frequency" checked={this.state.selectedOption === "quarterlyFrequency"} onChange={this.handleFrequencyChange}/>
            </div>

<<<<<<< HEAD
          <button onClick={this.submitForm}>Join Up</button>
        </form>

          {this.state.isSubmitted && email && <Payment email={email} selectedOption={selectedOption} />}
          
          { error && <p>{ error }</p> }
          { message && <p>{ message }</p>}

=======
            <button onClick={this.submitForm}>JOIN UP</button>
          </form>
            {this.state.isSubmitted && email && <Payment email={email} selectedOption={selectedOption} />}
            { error && <p>{ error }</p> }
            { message && <p>{ message }</p>}

            {/* { user.stripeId && <Link to = /admin/>} */}
          </div>
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde
        </div>
  )
}
}