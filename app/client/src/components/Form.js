import React, { useState } from 'react';
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import Heading2 from './Heading2';
import axios from "axios";


function Form() {

	const [player1, setPlayer1] = useState("Yasmine");
	const [player2, setPlayer2] = useState("");
	const [player1Set1, setPlayer1Set1] = useState(0);
	const [player2Set1, setPlayer2Set1] = useState(0);
	const [player1Set2, setPlayer1Set2] = useState(0);
	const [player2Set2, setPlayer2Set2] = useState(0);
	const [player1Set3, setPlayer1Set3] = useState(0);
	const [player2Set3, setPlayer2Set3] = useState(0);
	const [message, setMessage] = useState("");
	const [stage, setStage] = useState(1);
	const [set3Bool, set3setBool] = useState(false);

	function handleSet3Change() {
		set3setBool(prevValue => !prevValue);
	}

	function handleNext() {
		setStage(stage + 1);
	}

	function handleBack() {
		setStage(stage - 1);
	}

	function handleRefresh() {
		// refactor this later on...
		setPlayer1("Yasmine")
		setPlayer2("")
		setPlayer1Set1(0)
		setPlayer1Set2(0)
		setPlayer1Set3(0)
		setPlayer2Set1(0)
		setPlayer2Set2(0)
		setPlayer2Set3(0)
		setMessage("")
		setStage(1)
		set3setBool(false)
	}
  
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// Send a POST request to your Express backend
			const response = await axios.post('http://localhost:5000/api/matches', {
				player1: player1,
				player2: player2,
				player1Set1Games: player1Set1,
				player2Set1Games: player2Set1,
				player1Set2Games: player1Set2,
				player2Set2Games: player2Set2,
				player1Set3Games: player1Set3,
				player2Set3Games: player2Set3
			  });
			response.data ? setMessage(response.data) : setMessage("Error");
			console.log(response.data); // Log the response from the server
		  } catch (error) {
			setMessage(error.response ? error.response.data.errorMessage : error.message);
			console.error('Error adding match:', error);
		  }
	}


	return (
		<>
		{message ? (
			<>
				<div>
				{message[0].message}
				</div>
				<div>
				<ButtonPrimary onClick={handleRefresh}>Add another match</ButtonPrimary>
				</div>
			</>
		)
		: (<form onSubmit={handleSubmit} className="w-full max-w-sm">
			{stage === 1 && (
				<>
					<Heading2>Your results for the match</Heading2>
					<label htmlFor="player1Set1">Your set 1 games:</label>
					<input
						type="number"
						id="player1Set1"
						min={0}
						max={10}
						value={player1Set1}
						onChange={(e) => setPlayer1Set1(parseInt(e.target.value))}
						className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
						text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
					/>
					<label htmlFor="player1Set2">Your set 2 games:</label>
					<input
						type="number"
						id="player1Set2"
						value={player1Set2}
						min={0}
						max={10}
						onChange={(e) => setPlayer1Set2(parseInt(e.target.value))}
						className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
						text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
					/>
					{set3Bool ? (
						<>
							<label htmlFor="player1Set3">Your set 3 games:</label>
							<input
								type="number"
								id="player1Set3"
								value={player1Set3}
								min={0}
								max={10}
								onChange={(e) => setPlayer1Set3(parseInt(e.target.value))}
								className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
								text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
							/>
							<ButtonSecondary onClick={handleSet3Change}>Remove set 3</ButtonSecondary>
						</>
					) : (
						<ButtonSecondary onClick={handleSet3Change}>Add set 3</ButtonSecondary>
					)}
					<ButtonSecondary onClick={handleNext}>Next</ButtonSecondary>
				</>
			)}
			{stage === 2 && (
				<>
					<h2 className="text-center text-2xl mb-5">Your opponent's results:</h2>
					<label htmlFor="player2">Your opponent:</label>
					<input
						required
						minlength="2"
						maxlength="18"
						type="text"
						id="player2"
						value={player2}
						onChange={(e) => setPlayer2(e.target.value)}
						className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
						text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
					/>

					<label htmlFor="player2Set1">Opponent's set 1 games:</label>
					<input
						type="number"
						id="player2Set1"
						min={0}
						max={10}
						value={player2Set1}
						onChange={(e) => setPlayer2Set1(parseInt(e.target.value))}
						className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
						text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
					/>

					<label htmlFor="player2Set2">Opponent's set 2 games:</label>
					<input
						type="number"
						id="player2Set2"
						value={player2Set2}
						min={0}
						max={10}
						onChange={(e) => setPlayer2Set2(parseInt(e.target.value))}
						className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
						text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
					/>
					{set3Bool ? (
						<>
							<label htmlFor="player2Set3">Opponent's set 3 games:</label>
							<input
								type="number"
								id="player2Set3"
								value={player2Set3}
								min={0}
								max={10}
								onChange={(e) => setPlayer2Set3(parseInt(e.target.value))}
								className="my-5 bg-gray-700 appearance-none rounded w-full py-2 px-4
								text-gray-200 leading-tight focus:bg-gray-700 input-bordered"
							/>
							<ButtonSecondary onClick={handleSet3Change}>Remove set 3</ButtonSecondary>
						</>
					) : (
						<ButtonSecondary onClick={handleSet3Change}>Add set 3</ButtonSecondary>
					)}
					<ButtonSecondary onClick={handleBack}>Back</ButtonSecondary>
					<ButtonPrimary type="submit">Submit match</ButtonPrimary>
				</>
			)}
		</form>
		)}
		</>
	)
}

export default Form
