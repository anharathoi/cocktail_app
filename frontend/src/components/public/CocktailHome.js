import React, { Component } from 'react'
import axios from 'axios'
import './CocktailHome.css'

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
<<<<<<< HEAD

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
=======
          <p>Cocktails this month</p>
          {this.state.cocktails.map( cocktail => {return (
            <>
             <h2>Title {cocktail.title}</h2>
             <img src={cocktail.photo}/>
            </>
          )}
          )}
>>>>>>> 9683d1d9cc18372c0e647d1d369ba48e08064a9b
        </div>
      )}
      else {
        return null
      }
  }
}
