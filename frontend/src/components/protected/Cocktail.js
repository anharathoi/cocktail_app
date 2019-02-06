import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Cocktail extends Component {
  state = {}
  componentDidMount(){
    console.log("Cocktail.js mounted")
    const { title } = this.props.match.params
    // this.setState({title})
    const url = `http://localhost:5000/admin/cocktail/${title}`
    const token = Cookies.get('token')
    axios.get(url, {
        headers: {
        'Authorization': `bearer ${token}`
        }
    })
    .then( resp => {
        const cocktail = resp.data
        this.setState({cocktail})
        // console.log(this.state)
        console.log(this.state.cocktail.available)
    })
    .catch( err => {
        this.setState({error: JSON.stringify(err.response.data), status:JSON.stringify(err.response.status)})
    })
  }
  render() {
      if(this.state.cocktail){
        return(
          <div>
            <h1>{this.state.cocktail.title}</h1>
              <li>Title: {this.state.cocktail.title}</li>
              <li> <img style={{height:"220px"}} src={this.state.cocktail.photo}/></li>
              { this.state.cocktail.available && <li style={{color:"green"}}><h3>Available</h3></li> }
              { !this.state.cocktail.available && <li style={{color:"red"}}><h3>Not Available</h3></li> }
              <li>Description: {this.state.cocktail.description}</li>
              <li>Direction: {this.state.cocktail.directions}</li>
              <li>Ingredients: {this.state.cocktail.ingredients}</li>
          </div>
        )
      }
     else {
       return (
        <div>
          <h1>SORRY</h1>
          <h2>Admin Previleges Required</h2>
        </div>
      )
     }
  }
}