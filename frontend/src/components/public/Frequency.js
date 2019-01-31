import React from 'react'
import {PropTypes} from 'react'

const Frequency = (props) => (
    <div>
        <label className="form-label">{props.title}</label>
        <div className="radio-group">
            {props.options.map(option => {
                return (
                    <label key={option} className="frequency-form">
                        <input 
                        className="form-checkbox"
							name="frequency"
							onChange={props.controlFunc}
							value="monthly"
							checked={props.selectedOptions.indexOf(option) > -1}
                            type={props.type} /> 
                            monthly
                     <input 
                     className="form-checkbox"
                         name="frequency"
                         onChange={props.controlFunc}
                         value="quarterly"
                         checked={props.selectedOptions.indexOf(option) > -1}
                         type={props.type} /> 
                         quarterly
                 </label>
                )
            })}
        </div>

    </div>
);

// Frequency.propTypes = {
//     title: PropTypes.string.isRequired,
//     type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
// 	setName: PropTypes.string.isRequired,
// 	options: PropTypes.array.isRequired,
// 	selectedOptions: PropTypes.array,
//     controlFunc: PropTypes.func.isRequired
// };

//GUY - you can change the type: - not including checkbox in this one.

export default Frequency