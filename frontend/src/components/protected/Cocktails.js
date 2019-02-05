import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './Cocktails.css';

export default class Cocktails extends Component {
    state = {}
    handleDelete = (e) => {
        const title =(e.currentTarget.parentNode.parentNode.children[0].innerText)
        const token = Cookies.get('token')
        const url = `http://localhost:5000/admin/cocktail/delete/${title}`
        axios.delete(url, {
            headers: {
              'Authorization': `bearer ${token}`
            }
        })
        .then((res) => {
            this.props.getData()
        })
        .catch((err) => {
            console.log(err.response)
        })
    }


    render() {
        
      if(this.props.admin){
      return (
        <div>
          <nav>
            {/* <AdminSidebar {...this.props}/> */}
          </nav>
          
          <div id="cocktails" className="cocktails">
            <h2>Your Cocktails</h2>
            <table className="customers-table pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Photo</th>
                  <th>Description</th> 
                  <th>Directions</th>
                  <th>Ingredients</th>
                  <th>Available</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cocktails.map(cocktail => 
                  { return(
                      <tr key={cocktail._id}>
                        <td>{cocktail.title}</td>
                        <td> {cocktail.photo} </td>
                        <td>{cocktail.description}</td>
                        <td>{cocktail.directions}</td>
                        <td>{cocktail.ingredients}</td>
                        <td>{cocktail.available}</td>
                        <td><button onClick={this.handleDelete}>Delete</button></td>
                      </tr>
                    )
                  }
                )}
              </tbody>
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

