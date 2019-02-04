import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

export default class CreateCocktail extends React.Component {
  state = { isSubmitted: false }
  handleInputChange = (e) => {
      console.log(e.currentTarget.value)
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
    console.log(`this is ${JSON.stringify(this.state)}`)
  }
  submitForm = (e) => {
    e.preventDefault()
    console.log(`this is ${JSON.stringify(this.state)}`)
    // console.log(this.state)
    const {  title, photo, description, directions, ingredients } = this.state
    // console.log(this.state.available)
    const available = JSON.parse(this.state.available)
    const url = "http://localhost:5000/newcocktail"
    const data = { title, photo, description, directions, ingredients, available}


    const token = Cookies.get('token')
        axios.post(url, data,{
          headers: {
            'Authorization': `bearer ${token}`
          },
        })
        .then ( resp => {
            this.setState({ message: 'well done buddy you just created a new cocktail', error: null, isSubmitted: true})
            console.log(resp.data)
        })
        .catch(err => {
            console.log(err.response)
            if (err.response === 403) {
            this.setState({ error: 'Be a better admin!', message: null})
            }

    // axios.post(url, data)
    //   .then(resp => {
    //     this.setState({ message: 'well done buddy you just created a new cocktail', error: null, isSubmitted: true})
    //   })
    //   .catch(err => {
    //       console.log(err.response)
    //       if (err.response === 403) {
    //         this.setState({ error: 'Be a better admin!', message: null})
    //       }
    // })
  })
}
  render() {
    const { error, message } = this.state
    return (
      <div id="create-cocktails" style={{paddingTop: '40px'}}>
        <h2>Hi Admin, Create a new cocktail!</h2>
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
          <label htmlFor="available">Currently Available?:</label>
          <select type="boolean" id="available" onChange={this.handleInputChange}> 
                  <option name="true">true</option>
                  <option name="false">false</option>
              </select><br/>
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