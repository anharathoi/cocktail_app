import React from 'react';
import axios from 'axios';
import Payment from './Payment';
// import Frequency from './Frequency';
import Cookies from 'js-cookie';
import './Form.css'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isSubmitted: false,
      frequencyOptions: []
    }
  //   this.handleFrequencySubmit = this.handleFrequencySubmit.bind(this)
	// 	this.handleFrequencySelection = this.handleFrequencySelection.bind(this);
  }
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
  }
  
  // handleFrequencySelection = (e) => {
  //   const newSelection = e.target.value;
	// 	let newSelectionArray;
	// 	if(this.state.selectedFrequency.indexOf(newSelection) > -1) {
	// 		newSelectionArray = this.state.selectedFrequency.filter(s => s !== newSelection)
	// 	} else {
	// 		newSelectionArray = [...this.state.selectedFrequency, newSelection];
	// 	}
	// 	this.setState({ selectedFrequency: newSelectionArray }, () => console.log('frequency selection', this.state.selectedFrequency));
  // }

  handleFrequencyChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  // state = { isSubmitted: false }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }

  submitForm = (e) => {
    // console.log(this.state)
    e.preventDefault()
    // // console.log(this.state)
    const {  firstName, lastName, email, password, session, phone, deliveryAddress, dateJoined, numberOfOrders, stripeId, active, admin, selectedOption } = this.state
    
    // // const url = "https://cocktail-app.now.sh/register" // PROD
    const url = "http://localhost:5000/register" //DEV

    const data = { firstName, lastName, email, password, session, phone, deliveryAddress, dateJoined, numberOfOrders, stripeId, active, admin, selectedOption}
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

            <div className="form-check">
              <label htmlFor="frequency">Quarterly Frequency</label>
              <input type="radio" id="frequency2" value="quarterlyFrequency" name="frequency" checked={this.state.selectedOption === "quarterlyFrequency"} onChange={this.handleFrequencyChange}/>
            </div>

            <button onClick={this.submitForm}>JOIN UP</button>
          </form>
            {this.state.isSubmitted && email && <Payment email={email} selectedOption={selectedOption} />}
            { error && <p>{ error }</p> }
            { message && <p>{ message }</p>}

            {/* { user.stripeId && <Link to = /admin/>} */}
          </div>
        </div>
  )
}
}