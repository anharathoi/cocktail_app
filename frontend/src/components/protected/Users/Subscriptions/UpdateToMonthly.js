import React from 'react'
import axios from 'axios'
   
function UpdateToMonthly(props) {
  console.log(props)
  
    const updateMonthlySubscription = () => {
        // const url = "https/something /updatetomonthlysubscription" // PROD
        const url = "http://localhost:5000/updatetomonthlysubscription" // DEV
        const data = {
            email: props.email,
            subscriptionId: props.subscriptionId
        }

        axios.post(url, data)
            .then(response => {
                // const { success } = response.d ata
              console.log(response);
              console.log(data)
                })
            
            .catch ( err => {
              console.log(err.response)
            }) 
    }
 
  return (
    <div>
        <p>Want cocktails delivered every month instead?</p>
        <button onClick={props.updateMonthlySubscription}>Change to a Monthly</button>
        
    </div>
  ) 
}

export default UpdateToMonthly


  //     // const url = "https/something /updatetomonthlysubscription" // PROD
  //     const url = "http://localhost:5000/updatetomonthlysubscription" // DEV
  //     const data = {
  //         email: props.email,
  //         subscriptionId: props.subscriptionId
  //     }

  //     axios.post(url, data)
  //         .then(response => {
  //             // const { success } = response.d ata
  //           console.log(response);
  //             })
          
  //         .catch ( err => {
  //           console.log(err.response)
  //         }) 
  // }

  // return (
  //   <div>
  //     <button onClick={updateMonthlySubscription}>QUARTERLY UPDATE YO</button>
  //   </div>
  // )
  // })
  
  // export default UpdateToMonthly;