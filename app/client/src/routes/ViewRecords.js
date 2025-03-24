import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import Heading1 from "../components/Heading1";
import { Link } from 'react-router-dom';

function ViewRecords() {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	function handleRefresh() {
		setError("");
		setLoading(true);
		fetchData();
	}

	// Helper function to format timestamp
	const formatTimestamp = (timestamp) => {
		if (!timestamp) return 'N/A';
		
		try {
			// If it's already a string in ISO format
			if (typeof timestamp === 'string') {
				const date = new Date(timestamp);
				return date.toLocaleString();
			}
			
			// If it's a Firestore timestamp object
			if (timestamp.seconds) {
				const date = new Date(timestamp.seconds * 1000);
				return date.toLocaleString();
			}
			
			return String(timestamp);
		} catch (e) {
			console.error("Error formatting timestamp:", e);
			return String(timestamp);
		}
	};

	const fetchData = () => {
		// Add debugging
		console.log("Fetching records...");
		
		// Use direct axios call like in the Home component
		axios.get('https://patient-portal-api-617920253833.us-central1.run.app/api/records')
			.then((response) => {
				console.log("Raw records data:", response.data);
				
				// Check if we have data
				if (response.data && Array.isArray(response.data)) {
					setRecords(response.data);
				} else {
					// If response isn't an array
					console.error("Invalid records data format:", response.data);
					setError("Received invalid data format from server");
				}
				setLoading(false);
			})
			.catch(error => {
				console.error("Error fetching records:", error);
				setError("Failed to load records: " + (error.response?.data?.message || error.message));
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="text-white flex justify-center items-center my-10">
				<Heading1>Your Lab Results</Heading1>
			</div>
			
			{error && (
				<div className="backdrop-blur-md bg-red-500/20 text-red-100 p-4 rounded-xl mb-6 max-w-4xl mx-auto">
					{error}
					<div className="mt-2 text-sm">
						<button 
							onClick={handleRefresh}
							className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
						>
							Try Again
						</button>
					</div>
				</div>
			)}
			
			{loading ? (
				<div className="flex justify-center py-6">
					<LoadingSpinner />
				</div>
			) : (
				<div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-xl border border-white/20 max-w-4xl mx-auto">
					{records && records.length > 0 ? (
						<div className="overflow-x-auto rounded-xl">
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-white/5 text-white">
										<th className="border-0 border-b border-white/10 px-4 py-3 text-left">Test Name</th>
										<th className="border-0 border-b border-white/10 px-4 py-3 text-left">Test Date</th>
										<th className="border-0 border-b border-white/10 px-4 py-3 text-left">Ordered By</th>
										<th className="border-0 border-b border-white/10 px-4 py-3 text-left">Result</th>
										<th className="border-0 border-b border-white/10 px-4 py-3 text-left">Notes</th>
									</tr>
								</thead>
								<tbody className="text-gray-100">
									{records.map((record, idx) => (
										<tr key={record.id || idx} className="hover:bg-white/5 transition-colors">
											<td className="border-0 border-b border-white/5 px-4 py-3">{record?.test_name || 'N/A'}</td>
											<td className="border-0 border-b border-white/5 px-4 py-3">{formatTimestamp(record?.test_date)}</td>
											<td className="border-0 border-b border-white/5 px-4 py-3">{record?.ordered_by || 'N/A'}</td>
											<td className="border-0 border-b border-white/5 px-4 py-3">
												{record?.test_result !== undefined ? 
													(typeof record.test_result === 'object' 
														? JSON.stringify(record.test_result).substring(0, 30) + '...' 
														: record.test_result) 
													: 'N/A'}
											</td>
											<td className="border-0 border-b border-white/5 px-4 py-3">{record?.test_notes || 'N/A'}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="bg-white/5 p-6 rounded-xl text-center text-white">
							<p>No records found.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ViewRecords;