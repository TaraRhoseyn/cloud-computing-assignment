import React from 'react'
import Heading1 from "../components/Heading1";

function Home() {
  return (
	<div className="container mx-auto">
		<div className="text-white flex justify-center items-center my-10">
		<Heading1>Home</Heading1>
		{/* flowbite */}
		<button data-tooltip-target="tooltip-default" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button>
		<div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium 
			text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
			Tooltip content
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>

		{/* daisy */}
		<div className="tooltip" data-tip="hello">
			<button className="btn">Hover me</button>
		</div>
		</div>

		<div className="block">

		<div className="tooltip tooltip-right" data-tip="hello">
			<button className="btn">Right</button>
		</div>


			{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
		</div>

	</div>
  )
}

export default Home
