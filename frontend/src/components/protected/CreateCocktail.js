import React from 'react';
import axios from 'axios';

export default class CreateCocktail extends React.Component {
  state = { isSubmitted: false }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }
  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const {  title, photo, description, directions, ingredients /*available*/} = this.state
    const url = "http://localhost:5000/newcocktail"
    const data = { title, photo, description, directions, ingredients /*available*/}

    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just created a new cocktail', error: null, isSubmitted: true})
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Be a better admin!', message: null})
          }
    })
  }
  render() {
    const { error, message } = this.state
    return (
      <div id="register" style={{paddingTop: '40px'}}>
        <h2>Sign up for a Cocktail Subscription</h2>
        <form>
          <label htmlFor="title">Cocktail Name:</label>
          <input type="text" id="title" onChange={this.handleInputChange}/><br/>
          <label htmlFor="photo">Image:</label>
          <input type="text" /* image */ id="photo" onChange={this.handleInputChange}/><br/>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" onChange={this.handleInputChange}/><br/>
          <label htmlFor="directions">Directions: </label>
          <input type="text" id="directions" onChange={this.handleInputChange}/><br/>
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients" onChange={this.handleInputChange}/><br/>
          {/* <label htmlFor="available">Currently Available?:</label>
          <input type="boolean" id="available" onChange={this.handleInputChange}/><br/> */}
          <button onClick={this.submitForm}>Create Cocktail</button>
        </form>
          {this.state.isSubmitted}
          { error && <p>{ error }</p> }
          { message && <p>{ message }</p>}

          {/* { user.stripeId && <Link to = /admin/>} */}
        </div>
    )
}
}