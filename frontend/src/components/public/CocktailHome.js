import React, { Component } from 'react'
import axios from 'axios'

export default class CocktailHome extends Component {
  state = {rendered: false}
  componentDidMount () {
    const url =  `${process.env.REACT_APP_DOMAIN}/home/cocktail`
    axios.get(url)
    .then(resp => {
      console.log(resp)
      const cocktails = resp.data 
      this.setState({cocktails: cocktails, rendered: true})
      cocktails.map( cocktail => {
        console.log(cocktail.title)
      })
      console.log(cocktails)
    })
    .catch( err => console.log(err))

  }
  render() {
    if(this.state.rendered) {
      return (
        <div>
          <p>Cocktails this month</p>
          {this.state.cocktails.map( cocktail => {return (
            <>
             <h2>Title {cocktail.title}</h2>
             <img src={cocktail.photo}/>
            </>
          )}
          )}
        </div>
      )}
      else {
        return null
      }
  }
}
