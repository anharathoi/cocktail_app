import React, { Component } from 'react'
import axios from 'axios'
import './CocktailHome.css'

export default class CocktailHome extends Component {
  state = {rendered: false}
  componentDidMount () {
    const url = 'http://localhost:5000/home/cocktail'
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

          <div class="containercocktail">
            {this.state.cocktails.map( cocktail => {return (
              <div class="cocktailcard">
                <div class="cocktailcard-details">
                  <h1>{cocktail.title}</h1>
                  <br/>
                  <hr/>
                </div>
                  <div class="cocktailcardimage">
                    <img src={`${cocktail.photo}`}/>
                  </div>
               </div>



)}
)}
</div>
          {/* <p>Nothing</p> */}
          {/* <p>{this.state.cocktail.title}</p> */}
        </div>
      )}
      else {
        return null
      }
  }
}
