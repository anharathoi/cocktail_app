import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

class Logout extends Component {
  logoutHandle = (e) => {
    e.preventDefault()
    console.log("logging out")
    const url =  `${process.env.REACT_APP_DOMAIN}/logout`
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
      return (
        <Link to="#" onClick={this.logoutHandle}>Logout</Link>
      )
    }
}

export default withRouter(Logout)
