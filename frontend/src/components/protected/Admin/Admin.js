import React, { Component } from 'react'
import './Admin.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Admin.css'

import Customers from '../Customers';

class Admin extends Component {
  state = {}
  componentDidMount (){
    const url = `${process.env.REACT_APP_DOMAIN}/me`
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const {email, firstName, lastName, admin} = resp.data
        this.setState({email,firstName, lastName, admin})
        // this.props.setAdmin(admin)
      })
      .catch( err => console.log(err) )
  }
  render() {
    // console.log(this.props.admin)
      return (
        <div className="Admin" >
          <div id="page-wrap">
            <h1>Admin Dashboard </h1>
            <Customers {...this.props}/>
          </div>
        </div>
      );
  }
}

export default Admin;
