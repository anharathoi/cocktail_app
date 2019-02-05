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
import Cookies from 'js-cookie';
import Navbar from './components/public/Navbar'
import axios from 'axios'
require('dotenv').config()

class App extends React.Component {

  state = {}

  componentDidMount(){
    const token = Cookies.get('token')
    this.setState({token})
    // console.log("App.js component mounted "+ token)
    // if(token)
  }

  componentWillMount(){
    const token = Cookies.get('token')
    const url = 'http://localhost:5000/me' //
    if (token) { 
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const { admin } = resp.data
        this.setState({admin})
        // console.log("this is in state " + this.state.admin + "this is the save var " + admin)
      })
      .catch( err => console.log(err) )
    }
  }

  setToken = (token) => {
    this.setState({token: token})
    // console.log("This is from App " + this.state.token)
  }

  clearToken = () => {
    this.setState({token: null})
  }

  setAdmin = (isAdmin) =>{
    this.setState({admin: isAdmin})
  }

  render() {
    return (
        <div className="App">
          <div className="Main">
          {/* {!this.state.admin && <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>} */}
          <Navbar token={this.state.token} clearToken={this.clearToken} adminStatus={this.state.admin}/>
            <Switch>
              <Route
                exact path="/"
                render={(props) => <Home {...props} setToken={this.setToken} clearToken={this.clearToken} token={this.state.token} setAdmin={this.setAdmin}/> }
              />
              <Route
                exact path="/UserProfile"
                render={(props) => <UserProfile {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
              />
             <Route
                exact path="/Admin"
                render={(props) => <Admin {...props} setToken={this.setToken} token={this.state.token}  clearToken={this.clearToken} setAdmin={this.setAdmin} admin={this.state.admin}/>}
              />
              <Route path="/who_we_are" component={WhoWeAre} exact/>
              <Route path="/terms" component={Terms} exact/>
              <Route path="/privacy" component={Privacy} exact/>
              <Route path="/liquor_licence" component={LiquorLicence} exact/>
              <Route path="/faqs" component={Faqs} exact/>
              <Route path="/contact_us" component={ContactUs} exact/>
            </Switch>
          </div>
          {!this.state.admin && <Footer />}
        </div>
      
    );
  }
}

export default App;