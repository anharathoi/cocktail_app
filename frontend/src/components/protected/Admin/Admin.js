
import React, { Component } from 'react'
import './Admin.css';
import AdminSidebar from './AdminSidebar.js'
import AdminUserChart from './AdminUserChart.js'

class Admin extends Component {
  render() {
    return (
      <div className="Admin" >
        <nav>
        <AdminSidebar />
        </nav>
        <div id="page-wrap">
          <h1>Admin Dashboard </h1>
          <AdminUserChart/>
        </div>
      </div>
    );
  }
}

export default Admin;
