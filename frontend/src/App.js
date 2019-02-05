import React from 'react';
import './App.css';
import Footer from './components/public/Footer'
import Admin from './components/protected/Admin/Admin'
import UserProfile from './components/protected/Users/UserProfile'
import Home from './components/public/Home'
import ContactUs from './components/public/ContactUs'
import Faqs from './components/public/Faqs'
import LiquorLicence from './components/public/LiquorLicence'
import Privacy from './components/public/Privacy'
import Terms from './components/public/Terms'
import WhoWeAre from './components/public/WhoWeAre'
import { Route , Switch } from 'react-router-dom'
import Logout from './components/Logout';
import Cookies from 'js-cookie';
import Navbar from './components/public/Navbar'
require('dotenv').config()


class App extends React.Component {

  state = {}

  componentDidMount(){
    const token = Cookies.get('token')
    this.setState({token})
    console.log("App.js component mounted "+ token)
  }

  setToken = (token) => {
    this.setState({token: token})
    // console.log("This is from App " + this.state.token)
  }

  clearToken = () => {
    this.setState({token: null})
  }

  render() {
    // console.log(this.state.token)
    return (
        <div className="App">
          <div className="Main">
            <Navbar token={this.state.token} clearToken={this.clearToken}/>
            <Switch>
              <Route
                exact path="/"
                render={(props) => <Home {...props} setToken={this.setToken} clearToken={this.clearToken} token={this.state.token}/>}
              />
              <Route
                exact path="/UserProfile"
                render={(props) => <UserProfile {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} />}
              />
              <Route path="/Admin" component={Admin} exact/>
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