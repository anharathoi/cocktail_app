import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

class Logout extends Component {
  logoutHandle = (e) => {
    e.preventDefault()
    console.log("logging out")
<<<<<<< HEAD:frontend/src/components/public/Logout.js
    // const url = "https://cocktail-app.now.sh/logout" // PROD
    const url = "http:localhost:5000/logout" // DEV
=======
    // const url = "https://cocktail-app.now.sh/logout" // Prod url
    const url = "http://localhost:5000/logout";
>>>>>>> ffb28f2a7e7b19e1c8d3b32f64b471f018941dde:frontend/src/components/Logout.js
    const token = Cookies.get('token')
    axios.get(url, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(resp => {
      Cookies.remove('token');
      this.props.clearToken()
      this.props.history.push('/')
    })
    .catch( err => console.log(err))
  }

  render() {
    // console.log(this.props)
    // if(this.props.loggedIn === true){
      return (
        <Link to="#" onClick={this.logoutHandle}>Logout</Link>
      )
    }
}

export default withRouter(Logout)
