import React from 'react'

const AddSubscription = (props) => {
  return (
    <div>
      <button onClick={props.addMonthlySubscription}>Add Monthly Subscription</button>
      <button onClick={props.addQuarterlySubscription}>Add Quarterly Subscription</button>
      
    </div>
  )
}

export default AddSubscription





