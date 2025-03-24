import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import Heading1 from "../components/Heading1";
import { Link } from 'react-router-dom';
import fetchAllMatchesFromAPI from "../fetchAllMatchesFromAPI";

// TODO: don't really need message or handleRefresh() anymore - can get rid of it... 
/*
Component renders fetched data from backend
*/
function ViewMatches() {
	const [matches, setMatches] = useState([]);
	const [message, setMessage] = useState("");

	function handleRefresh() {
		// can remove this...
		// fetchData();
		// setMatches([])
		setMessage("")
	}

	

	/*
	Retrieves object data from backend API endpoint
	*/
	const fetchData = async () => {
		try {
			const matches = await fetchAllMatchesFromAPI();
			setMatches(matches);
		} catch (error) {
			console.error("Error fetching matches:", error);
		}
	};

	// Fetches data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	/*
	Func sends a delete request to backend
	
	*/
	const handleDelete = async (id) => {
		try {
			await axios.delete(`/api/matches/${id}`);
			// alert('Match deleted')
			setMatches(matches.filter(match => match.id !== id));
			document.getElementById('my_modal_1').showModal()
			// response.data ? setMessage(response.data) : setMessage("Error");
		} catch (err) {
			console.error("Error deleting match:", err);
		}
	};


	return (
		<div className="container mx-auto text-white">
			<div className="text-white flex justify-center items-center my-10">
			<Heading1>Your matches</Heading1>
			</div>

			{message ? (
				// alll this is to go....
				<div>
					<p>Match successfully deleted!</p>
					<button onClick={handleRefresh} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View matches</button>
				</div>
			) : (
				<div className="flex justify-center items-center h-full">
					<div className="flex flex-col items-center">
						{matches.length === 0 && <LoadingSpinner />}
						{matches.length > 0 && (
							<>
								{matches.map((match) => (
									<>
										<div className="grid grid-cols-3 gap-4">
											{/* win status: */}
											<div className="flex items-center justify-end">
											{match.matchWinner === match.players.player1 ? (
												// winning:
												<div className="flex flex-col items-center" id="win">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="w-6 h-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
													</svg>
													<p className="letter-spacing-custom text-amber-500">WIN</p>
												</div>
											) : (
												<div className="flex flex-col items-center">
													<p className="letter-spacing-custom">LOSS</p>
												</div>
											)}
											</div>
											<div>
											<table
											key={match.id}
											className="bg-gray-900 my-6 rounded-lg overflow-hidden shadow-2xl"
										>
											<tbody>
												{/* PLAYER 1 ROW */}
												<tr className="border-b-2 border-gray-800">
													<td
														className={`p-1 pl-5 pr-5 ${match.matchWinner === match.players.player1
																? "text-lime-400 font-extrabold"
																: ""
															}`}
													>
														{match.players.player1}
													</td>
													<div className={`grid ${match.sets.length === 3
																		? "grid-cols-3"
																		: "grid-cols-2"
																	}`}>
														<div className="p-1">
															<td
																className={`p-1 ${match.sets[0].player1Score >
																		match.sets[0].player2Score
																		? "text-lime-400 font-extrabold bg-gray-800 px-2 rounded"
																		: ""
																	}`}
															>
																{match.sets[0].player1Score}
															</td>
														</div>
														<div className="p-1">
															<td
																className={`p-1 ${match.sets.length < 3 ? "" : ""
																	} ${match.sets[1].player1Score >
																		match.sets[1].player2Score
																		? "text-lime-400 font-extrabold bg-gray-800 px-2 rounded"
																		: "px-2"
																	}`}
															>
																{match.sets[1].player1Score}
															</td>
														</div>
													
													

													{match.sets.length === 3 && (
														<div className="p-1">
															<td
																className={`p-1 ${match.sets[2].player1Score >
																		match.sets[2].player2Score
																		? "text-lime-400 font-extrabold bg-gray-800 rounded-sm px-2 "
																		: "px-2"
																	}`}
															>
																{match.sets[2].player1Score}
															</td>
														</div>
														
													)}
													</div>
												</tr>
												{/* PLAYER 2 ROW */}
												<tr>
													<td
														className={`p-1 pl-5 ${match.matchWinner === match.players.player2
																? "text-lime-400 font-extrabold"
																: "px-2"
															}`}
													>
														{match.players.player2}
													</td>
													<div className={`grid ${match.sets.length === 3
																		? "grid-cols-3"
																		: "grid-cols-2"
																	}`}>
														<div className="p-1">
															<td
																className={`p-1 ${match.sets[0].player2Score >
																		match.sets[0].player1Score
																		? "text-lime-400 font-extrabold bg-gray-800 rounded-sm px-2 "
																		: "px-2"
																	}`}
															>
																{match.sets[0].player2Score}
															</td>
														</div>
														<div className="p-1">
															<td
															className={`p-1 ${match.sets.length < 3 ? "" : ""
																} ${match.sets[1].player2Score >
																	match.sets[1].player1Score
																	? "text-lime-400 font-extrabold bg-gray-800 rounded-sm px-2 "
																	: "px-2"
																}`}
															>
																{match.sets[1].player2Score}
															</td>
														</div>
													
													
													
													{match.sets.length === 3 && (
														<div className="p-1">
															<td
																className={`p-1 ${match.sets[2].player2Score >
																		match.sets[2].player1Score
																		? "text-lime-400 font-extrabold bg-gray-800 rounded-sm px-2 "
																		: "px-2"
																	}`}
															>
																{match.sets[2].player2Score}
															</td>
														</div>
														
													)}
													</div>
												</tr>
											</tbody>
										</table>
											</div>
											<div className="block mt-9">
											{/* EDIT BUTTON: */}
												<div>
													<div  className="tooltip tooltip-right" data-tip="Edit match">
													<Link to={`/updatematch/${match.id}`} className="inline-block min-content">
														<svg data-tooltip-target="tooltip-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b7280" className="w-5 h-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
														</svg>
													</Link>
													</div>
													
												</div>
												<div className="tooltip tooltip-right" data-tip="Delete match">
													{/* DELETE BUTTON: */}
													<button data-tooltip-target="tooltip-delete" onClick={() => handleDelete(match.id)} className="mt-2">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6b7280" className="w-5 h-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
														</svg>
													</button>
												</div>
											
											
											</div>
											
										</div>
										
										
									</>
								))}
							</>
						)}
					</div>
				</div>
			)}

			<dialog id="my_modal_1" className="modal">
				<div className="modal-box text-black">
					<h3 className="font-bold text-lg">Match deleted!</h3>
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
	);
}

export default ViewMatches;
