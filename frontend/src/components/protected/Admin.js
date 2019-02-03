import React, { Component } from 'react'
import './Admin.css';
import AdminSidebar from './AdminSidebar.js'
import AdminUserChart from './AdminUserChart.js'
import axios from 'axios';
import Cookies from 'js-cookie';
import Customers from './Customers';
import Login from '../public/Login';
import { Route , Switch } from 'react-router-dom'

class Admin extends Component {
  state = {}
  componentDidMount (){
    const url = 'http://localhost:5000/me'
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        const {email, firstName, lastName, admin} = resp.data
        this.setState({email,firstName, lastName, admin})
        this.props.setAdmin(admin)
      })
      .catch( err => console.log(err) )
  }
  render() {
    if(this.props.token && this.state.admin){
      return (
        <div className="Admin" >
          <nav>
          <AdminSidebar {...this.props}/>
          </nav>
          <div id="page-wrap">
            <h1>Admin Dashboard </h1>
            <AdminUserChart/>
            <Customers {...this.props}/>
          </div>
        </div>
      );
    }
    // else if(this.props.) 
   else {
     return (
       <div style={{paddingTop: '40px'}}>
       <p> ACCESS DENIED</p>
          Please Log in to see details
            < Login {...this.props}/>
        </div>
     )
   }
  }
}

export default Admin;
