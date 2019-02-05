import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';
<<<<<<< HEAD
import CreateCocktail from '../protected/CreateCocktail'
=======
import './Home.css'
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde



export default class Home extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <div id="home" className="home">
          <About />
          <HowItWorks/>
          <Register {...this.props}/>
          <Login {...this.props}/>
        </div>
      </div>
    )
  }
  }
  
