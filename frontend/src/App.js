import React from 'react';
import './App.css';
import Footer from './components/public/Footer'
import Admin from './components/protected/Admin'
import UserProfile from './components/protected/UserProfile'
import Home from './components/public/Home'
import ContactUs from './components/public/ContactUs'
import Faqs from './components/public/Faqs'
import LiquorLicence from './components/public/LiquorLicence'
import Privacy from './components/public/Privacy'
import Terms from './components/public/Terms'
import WhoWeAre from './components/public/WhoWeAre'
import { Route , Switch } from 'react-router-dom'


require('dotenv').config()


class App extends React.Component {
  render() {
    return (
    
        <div className="App">
          <div className="Main">
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Admin" component={Admin} exact/>
              <Route path="/UserProfile" component={UserProfile} exact/>
              <Route path="/who_we_are" component={WhoWeAre} exact/>
              <Route path="/terms" component={Terms} exact/>
              <Route path="/privacy" component={Privacy} exact/>
              <Route path="/liquor_licence" component={LiquorLicence} exact/>
              <Route path="/faqs" component={Faqs} exact/>
              <Route path="/contact_us" component={ContactUs} exact/>
            </Switch>
          </div>
            <Footer />
        </div>
      
    );
  }
}

export default App;