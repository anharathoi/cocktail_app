import React from 'react'
// import axios from 'axios'
 
function UpdateToQuarterly(props) {
  console.log(props)
 
    return (
      <div>
        <p>Want cocktails delivered every 3 months instead?</p>
        <button onClick={props.updateQuarterlySubscription}>Change to Quarterly</button>
      </div>
    )
  }
  
  export default UpdateToQuarterly;