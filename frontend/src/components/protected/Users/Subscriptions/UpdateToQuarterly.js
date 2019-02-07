import React from 'react'
 
function UpdateToQuarterly(props) {
  console.log(props)
 
    return (
      <>
        <p>Want cocktails delivered every 3 months instead?</p>
        <button onClick={props.updateQuarterlySubscription}>Change to Quarterly</button>
      </>
    )
  }
  
  export default UpdateToQuarterly;