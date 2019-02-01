import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminSidebar from './AdminSidebar.js';

export default class Customers extends Component {
  state = {customers: []}
  componentDidMount (){
    const url = 'http://localhost:5000/admin/users'
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then ( resp => {
        console.log(resp)
        this.setState({customers: resp.data, token})
      })
      .catch( err => {
        this.setState({error: JSON.stringify(err.response.data), status:JSON.stringify(err.response.status)})
      })
  }
  render() {
    if(this.props.token && !this.state.error){
    return (
      <div>
        <nav>
          <AdminSidebar {...this.props}/>
        </nav>
        Your Customers:
        {this.state.customers.map(customer => 
          { return(
            <div key={customer._id}>
              <h4>{customer.firstName} {customer.lastName}</h4>
              <li>Email: {customer.email}</li>
              <li>Phone: {customer.phone}</li>
              <li>Delivery Address: {customer.deliveryAddress}</li>
              <li>Number of orders: {customer.numberOfOrders}</li>
            </div>
            )
          }
        )}
      </div>
        
        )
      } else {
        return(
          <div>
            <h1>Admin privileges required</h1>
            <p>{this.state.error}</p>
            <p>{this.state.status}</p>
          </div>
        )
      }
  }
}
