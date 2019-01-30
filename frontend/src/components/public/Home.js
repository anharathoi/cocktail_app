import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';


export default function Home(props) {
  // console.log(props)
  return (
    <>
      {/* <Navbar/> */}
      <div id="home" style={{paddingTop: '40px'}}>
        <About />
        <HowItWorks/>
        <Register/>
        <Login {...props}/>
      </div>
    </>
  )
}
