import React from 'react'
import AddMatches from '../routes/AddMatches'

function SuccessMessage() {

	const handleClick = () => {
		<AddMatches/>
	}

  return (
	<div>
	  	<p>Match successfully added/deleted</p>
		<button onClick={handleClick}>Add another match</button>
	</div>
  )
}

export default SuccessMessage
