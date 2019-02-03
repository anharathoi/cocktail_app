import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';
import Navbar from './Navbar'
import CreateCocktail from '../protected/CreateCocktail'
import Cookies from 'js-cookie';
import './Home.css'



export default class Home extends React.Component {
  state = {}

  render() {
    return (
      <div>
        {/* <Navbar/> */}
        <div id="home" className="home">
          <About />
          <HowItWorks/>

            <Register {...this.props}/>
            {/* <CreateCocktail /> */}
            <Login {...this.props}/>

        </div>
      </div>
    )
  }
  }
  
