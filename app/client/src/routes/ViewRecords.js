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
		<div className="container mx-auto px-4 py-8">
		  <div className="text-white flex justify-center items-center my-10">
			<Heading1>Your Lab Results</Heading1>
		  </div>
		  
		  {message && (
			<div className="backdrop-blur-md bg-red-500/20 text-red-100 p-4 rounded-xl mb-6 max-w-4xl mx-auto">
			  {message}
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