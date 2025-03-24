import React from 'react'

function ButtonSecondary({ onClick, children }) {
	return (
		<button
			onClick={onClick}
			className="my-5 mr-5 bg-gray-400 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded"
		>
			{children}
		</button>
	)
}

export default ButtonSecondary
