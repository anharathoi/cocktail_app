import React from 'react'
import axios from 'axios'
   
function UpdateToMonthly(props) {
  console.log(props)
  
    const updateMonthlySubscription = () => {
        const url = `${process.env.REACT_APP_DOMAIN}/updatetomonthlysubscription`
        const data = {
            email: props.email,
            subscriptionId: props.subscriptionId
        }

        axios.post(url, data)
            .then(response => {
              console.log(response);
                })
            .catch ( err => {
              console.log(err.response)
            }) 
    }
 
  return (
    <>
        <p>Want cocktails delivered every month instead?</p>
        <button onClick={props.updateMonthlySubscription}>Change to a Monthly</button>
    </>
  ) 
}

export default UpdateToMonthly

