import React from 'react'

function Heading1({children}) {
  return (
	<h1  className="text-center mb-2 text-4xl font-extrabold 
	leading-none tracking-tight text-white md:text-5xl lg:text-5xl mt-3">
	  {children}
	</h1>
  )
}

export default Heading1
