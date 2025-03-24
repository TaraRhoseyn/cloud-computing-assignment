import React, { useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import Form from "../components/Form"
import Heading1 from "../components/Heading1";

function AddMatches() {
	
  return (
    <div className="container mx-auto text-white">
		<Heading1>Add a match</Heading1>
		<div className="text-white flex justify-center items-center my-10">			
			<Form/>
		</div>
		
		
    </div>
  );
}

export default AddMatches;
