import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Cocktails from './Cocktails'

export default class CreateCocktail extends React.Component {
  state = { isSubmitted: false, available: true, photo: null, availabilityMonth:"this month", cocktails: ["default cocktail1", "default cocktail2"] }

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
   
    axios.post( `${process.env.REACT_APP_DOMAIN}/upload`, formData, config)
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
  }

  getData = () => {
    const url =  `${process.env.REACT_APP_DOMAIN}/cocktails`
    const token = Cookies.get('token')
    axios.get(url, {
        headers: {
        'Authorization': `bearer ${token}`
        }
    })
    .then( resp => {
        const cocktails = resp.data
        this.setState({cocktails: cocktails})
    })
    .catch( err => {
        // this.setState({error: JSON.stringify(err.response.data), status:JSON.stringify(err.response.status)})
    console.log(err)
      })
}

  componentDidMount() {
    this.getData()
  }

  submitForm = (e) => {
    e.preventDefault()
    // console.log(`this is ${JSON.stringify(this.state)}`)
    const {  title, description, directions, ingredients, photo, available, availabilityMonth } = this.state
    console.log(this.state.available)
    const url =  `${process.env.REACT_APP_DOMAIN}/newcocktail`
    const data = { title, photo, description, directions, ingredients, available, availabilityMonth}
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
         })
    }

  render() {
    const { error, message, cocktails } = this.state
        if (cocktails) {
            return (
        <div>
          <div className="admincontain">
            <h2>Hi Admin, Create a new cocktail!</h2>
            <div id="create-cocktails" className="create-cocktails site-form">
              <form>
                <label htmlFor="title">Cocktail Name:</label>
                <input type="text" id="title" onChange={this.handleInputChange}/><br/>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" onChange={this.handleInputChange}/><br/>
                <label htmlFor="directions">Directions: </label>
                <input type="text" id="directions" onChange={this.handleInputChange}/><br/>
                <label htmlFor="ingredients">Ingredients:</label>
                <input type="text" id="ingredients" onChange={this.handleInputChange}/><br/>
                <label htmlFor="available">Currently Available?:</label>
                <select defaultValue={this.state.available} type="boolean" id="available" onChange={this.handleInputChange}> 
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select><br/>

                <label htmlFor="available">Available this month?</label>
                <select defaultValue={this.state.availabilityMonth} type="text" id="availabilityMonth" onChange={this.handleInputChange}> 
                  <option value="this month">This Month</option>
                  <option value="next month">Next Month</option>
                </select><br/>

                <input type="file" name="image-upload" id="image-upload" className="select-button" onChange={this.handleUpload} />
                <div>
                  {this.state.photo && <img style={{height: "100px"}}src={this.state.photo} alt="cloudinary-upload"/>}
                </div>
                {this.state.photo  && <button className="select-button" onClick={this.submitForm}>Create Cocktail</button> }
              </form>
              {this.state.isSubmitted}
              { error && <p>{ error }</p> }
              { message && <p>{ message }</p>}
            </div>
            <Cocktails {...this.props} cocktails={cocktails} getData={this.getData} />
          </div>
        </div>
            )
        }
        else {
            return null
        }
    }       
}