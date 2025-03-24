import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import Heading1 from "../components/Heading1";
import { Link } from 'react-router-dom';
import fetchDataFromAPI from "../fetchDataFromAPI";

function ViewRecords() {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");

	function handleRefresh() {
		setMessage("");
		setLoading(true);
		fetchData();
	}

	// Helper function to format timestamp
	const formatTimestamp = (timestamp) => {
		if (!timestamp) return 'N/A';
		
		// Check if it's a Firestore Timestamp object
		if (timestamp.seconds && timestamp.nanoseconds) {
			const date = new Date(timestamp.seconds * 1000);
			return date.toLocaleString();
		}
		
		// If it's already a string or other format
		return String(timestamp);
	};

	const fetchData = async () => {
		try {
			const data = await fetchDataFromAPI();
			console.log("API Response:", data);
			
			const validRecords = Array.isArray(data) 
				? data.filter(item => item && typeof item === 'object')
				: [];
				
			setRecords(validRecords);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching records:", error);
			setMessage("Error fetching records: " + error.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container">
			<Heading1 className="mb-4">Your patient records</Heading1>
			
			{message && <div className="text-red-500 mb-4">{message}</div>}
			
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="mx-auto max-w-4xl mt-20">
					<h3 className="text-white text-lg">Your lab results:</h3>
					{records && records.length > 0 ? (
						<table className="w-full mt-4 border-collapse">
							<thead>
								<tr className="bg-gray-100">
									<th className="border px-4 py-2 text-left">Test Name</th>
									<th className="border px-4 py-2 text-left">Test Date</th>
									<th className="border px-4 py-2 text-left">Ordered By</th>
									<th className="border px-4 py-2 text-left">Result</th>
									<th className="border px-4 py-2 text-left">Notes</th>
								</tr>
							</thead>
							<tbody>
								{records.map((record, idx) => (
									<tr key={record.id || idx}>
										<td className="border px-4 py-2 text-white">{record?.test_name || 'N/A'}</td>
										<td className="border px-4 py-2  text-white">{formatTimestamp(record?.test_date)}</td>
										<td className="border px-4 py-2  text-white">{record?.ordered_by || 'N/A'}</td>
										<td className="border px-4 py-2  text-white">
											{record?.test_result !== undefined ? 
												(typeof record.test_result === 'object' 
													? JSON.stringify(record.test_result).substring(0, 30) + '...' 
													: record.test_result) 
												: 'N/A'}
										</td>
										<td className="border px-4 py-2  text-white">{record?.test_notes || 'N/A'}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="mt-4 p-4 bg-gray-100 rounded">
							<p>No records found.</p>
						</div>
					)}
				</div>
			)}
			
		</div>
	);
}

export default ViewRecords;