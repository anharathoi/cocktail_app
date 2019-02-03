import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';
import Navbar from './Navbar'
import CreateCocktail from '../protected/CreateCocktail'
import Cookies from 'js-cookie';



export default class Home extends React.Component {
  state = {}

  render() {
    return (
      <>
        {/* <Navbar/> */}
        <div id="home" style={{paddingTop: '40px'}}>
          <About />
          <HowItWorks/>
          <Register {...this.props}/>
          <CreateCocktail />
          <Login {...this.props}/>
  
        </div>
      </>
    )
  }
  }
  
