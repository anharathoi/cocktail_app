import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Cocktails from './Cocktails'

export default class CreateCocktail extends React.Component {
  state = { isSubmitted: false, available:true, photo: null }

  handleUpload = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData.get('file'))
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('http://localhost:5000/upload', formData, config)
    .then( (res) => {
      const photo= res.data.secure_url
      this.setState({ photo })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
    // console.log(`this is ${JSON.stringify(this.state)}`)
  }

  getData = () => {
    const url = 'http://localhost:5000/cocktails'
    const token = Cookies.get('token')
    axios.get(url, {
        headers: {
        'Authorization': `bearer ${token}`
        }
    })
    .then( resp => {
        console.log(resp.data)
        const cocktails = resp.data
        console.log(cocktails)
        this.setState({cocktails: cocktails})
    //   console.log(cocktails)
    })
    .catch( err => {
        this.setState({error: JSON.stringify(err.response.data), status:JSON.stringify(err.response.status)})
    })
}

  componentDidMount() {
    this.getData()
    }

  submitForm = (e) => {
    e.preventDefault()
    // console.log(`this is ${JSON.stringify(this.state)}`)
    const {  title, description, directions, ingredients, photo } = this.state
    console.log(this.state.available)
    // the JSON.parse is required as "available" is being saved as a string in the state instead of a boolean
    const available = JSON.parse(this.state.available)
    const url = "http://localhost:5000/newcocktail"
    const data = { title, photo, description, directions, ingredients, available}
    const token = Cookies.get('token')
        axios.post(url, data,{
          headers: {
            'Authorization': `bearer ${token}`
          },
        })
        .then ( resp => {
            this.setState({ message: 'well done buddy you just created a new cocktail', error: null, isSubmitted: true}, () => {
                this.getData()
            })
        })
        .catch(err => {
            console.log(err.response)
            if (err.response === 403) {
            this.setState({ error: 'Be a better admin!', message: null})
        }

    // axios.post(url, data)
    //   .then(resp => {
    //     this.setState({ message: 'well done buddy you just created a new cocktail', error: null, isSubmitted: true})
    //   })
    //   .catch(err => {
    //       console.log(err.response)
    //       if (err.response === 403) {
    //         this.setState({ error: 'Be a better admin!', message: null})
    //       }
    // })
         })
    }

  render() {
    const { error, message, cocktails } = this.state
        if (cocktails) {
            return (
        <>
            <div id="create-cocktails" style={{paddingTop: '40px'}}>
                <h2>Hi Admin, Create a new cocktail!</h2>
                <form>
                <label htmlFor="title">Cocktail Name:</label>
                <input type="text" id="title" onChange={this.handleInputChange}/><br/>
                {/* <label htmlFor="photo">Image:</label> */}
                <input type="text" /* image */ id="photo" onChange={this.handleInputChange}/><br/>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" onChange={this.handleInputChange}/><br/>
                <label htmlFor="directions">Directions: </label>
                <input type="text" id="directions" onChange={this.handleInputChange}/><br/>
                <label htmlFor="ingredients">Ingredients:</label>
                <input type="text" id="ingredients" onChange={this.handleInputChange}/><br/>
                <label htmlFor="available">Currently Available?:</label>
                <select type="boolean" id="available" onChange={this.handleInputChange}> 
                  <option name="true" >true</option>
                  <option name="false" >false</option>
                </select><br/>
                <input type="file" name="image-upload" id="image-upload" onChange={this.handleUpload} />
                <div>
                  {this.state.photo && <img style={{height: "100px"}}src={this.state.photo} alt="cloudinary-upload"/>}
                </div>
          
          {this.state.photo  && <button onClick={this.submitForm}>Create Cocktail</button> }
                </form>
                {this.state.isSubmitted}
                { error && <p>{ error }</p> }
                { message && <p>{ message }</p>}

                {/* { user.stripeId && <Link to = /admin/>} */}
                </div>
                <Cocktails {...this.props} cocktails={cocktails} getData={this.getData} />
            </>
            )
        }
        else {
            return null
        }
    }       
}