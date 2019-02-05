import React from 'react'
// import axios from 'axios'
  
const UpdateToMonthly = (props) => {
  console.log(props);
  return (
    <div>
        <p>Change to a monthly subscription</p>
        <button onClick={props.updateMonthlySubscription}>Change</button>
      
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