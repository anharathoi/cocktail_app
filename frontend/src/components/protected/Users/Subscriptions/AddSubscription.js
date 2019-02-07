import React from 'react'

const AddSubscription = (props) => {
  return (
    <>
      <button onClick={props.addMonthlySubscription}>Add Monthly Subscription</button>

      <button onClick={props.addQuarterlySubscription}>Add Quarterly Subscription</button>
    </>
  )
}

export default AddSubscription





