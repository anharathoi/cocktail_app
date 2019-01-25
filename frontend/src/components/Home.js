import React from 'react'
import Register from './Register'
import Login from './Login'
import HowItWorks from './HowItWorks';
import About from './About';

export default function Home() {
  return (
    <div>
        <About />
        <HowItWorks/>
        <Register/>
        <Login />
    </div>
  )
}
