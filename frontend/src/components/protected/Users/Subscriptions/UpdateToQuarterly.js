import React from 'react'
import axios from 'axios'

function UpdateToQuarterly(props) {
  console.log(props)
  
    const updateQuarterlySubscription = () => {
        // const url = "https/something /updatetoquarterlysubscription" // PROD
        const url = "http://localhost:5000/updatetoquarterlysubscription" // DEV
        const data = {
            email: props.email,
            subscriptionId: props.subscriptionId
        }

        axios.post(url, data)
            .then(response => {
                // const { success } = response.d ata
              console.log(response);
                })
            
            .catch ( err => {
              console.log(err.response)
            }) 
    }
 
    return (
      <div>
        <button onClick={updateQuarterlySubscription}>QUARTERLY UPDATE YO</button>
      </div>
    )
  }
  
  export default UpdateToQuarterly;