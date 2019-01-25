import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Admin from './components/Admin'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import { BrowserRouter, Route , Switch } from 'react-router-dom'

require('dotenv').config()


class App extends React.Component {
  render() {
    return (
    
        <>
          <Navbar/>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Admin" component={Admin} exact/>
              <Route path="/UserProfile" component={UserProfile} exact/>
            </Switch>
          <Footer />
        </>
      
    );
  }
}

export default App;