import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';
import Navbar from './Navbar'


export default function Home(props) {
  console.log("this is homepage props " + props)
  return (
    <>
      
      <div id="home" style={{paddingTop: '40px'}}>
        <About />
        <HowItWorks/>
        <Register/>
        <Login {... props}/>
      </div>
    </>
  )
}
