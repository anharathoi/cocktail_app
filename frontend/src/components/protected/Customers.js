import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminSidebar from './AdminSidebar.js';
import './Customers.css';

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
      .then( resp => {
        const {admin, customers} = resp.data
        this.setState({customers: customers, token})
        this.props.setAdmin(admin)
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
          {/* <AdminSidebar {...this.props}/> */}
        </nav>
        <h1>Your Customers</h1>
        <div id="customers">
          <table className="pure-table pure-table-horizontal">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th> 
              <th>Delivery Address</th>
              <th>Number of Orders</th>
            </tr>
          {this.state.customers.map(customer => 
            { return(
                <tr key={customer._id}>
                  <td>{customer.firstName} {customer.lastName}</td>
                  <td> {customer.email} </td>
                  <td>{customer.phone}</td>
                  <td>{customer.deliveryAddress}</td>
                  <td>{customer.numberOfOrders}</td>
                </tr>
              )
            }
          )}
          </table>
        </div>
      </div>
    )} else {
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
