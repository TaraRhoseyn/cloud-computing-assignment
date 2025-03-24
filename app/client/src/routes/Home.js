import React, { useEffect, useState } from 'react';
import Heading1 from "../components/Heading1";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from 'react-router-dom';
import axios from "axios";

function Home() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Add debugging
    console.log("Fetching appointments...");
    
    // Fetch appointments with error handling
    axios.get('http://localhost:5000/api/appointments')
      .then((response) => {
        console.log("Raw appointment data:", response.data);
        
        // Check if we have data
        if (response.data && Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          // If response isn't an array
          console.error("Invalid appointment data format:", response.data);
          setError("Received invalid data format from server");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments: " + (error.response?.data?.message || error.message));
        setLoading(false);
      });
  }, []);

  const formatTimestamp = (timestamp) => {
	if (!timestamp) return 'N/A';
	
	try {
	  // If it's already a string in ISO format
	  if (typeof timestamp === 'string') {
		const date = new Date(timestamp);
		const formattedDate = date.toLocaleDateString(); // e.g., "8/14/2026"
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		
		return `${formattedDate} at ${hours}:${minutes}`;
	  }
	  
	  // If it's a Firestore timestamp object
	  if (timestamp.seconds) {
		const date = new Date(timestamp.seconds * 1000);
		const formattedDate = date.toLocaleDateString();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		
		return `${formattedDate} at ${hours}:${minutes}`;
	  }
	  
	  return String(timestamp);
	} catch (e) {
	  console.error("Error formatting timestamp:", e);
	  return String(timestamp);
	}
  };

  // Dummy appointments for testing - only use if appointments array is empty
  const dummyAppointments = [
    {
      id: "dummy1",
      date: { seconds: Math.floor(new Date().getTime() / 1000) + 86400, nanoseconds: 0 },
      hospital: "University of South Wales Hospital",
      department: "Cardiology", 
      with_who: "Dr. Sarah Williams"
    },
    {
      id: "dummy2",
      date: { seconds: Math.floor(new Date().getTime() / 1000) + 172800, nanoseconds: 0 },
      hospital: "Cardiff Royal Infirmary",
      department: "Neurology",
      with_who: "Dr. Michael Chen"
    }
  ];

  // For debugging in development
  const displayAppointments = appointments.length > 0 ? appointments : (process.env.NODE_ENV === 'development' ? dummyAppointments : []);

  return (
    <div className="container mx-auto">
      <div className="text-white flex justify-center items-center my-10">
        <Heading1>Home</Heading1>
      </div>

      <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-xl border border-white/20 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Upcoming Appointments</h2>
        
        {loading ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-500/20 p-4 rounded-xl text-red-100 mb-4 backdrop-blur-sm">
            {error}
            <div className="mt-2 text-sm">
              Please check your server connection and database configuration.
            </div>
          </div>
        ) : (
          <>
            {displayAppointments.length > 0 ? (
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-white">
                      <th className="border-0 border-b border-white/10 px-4 py-3 text-left">Date</th>
                      <th className="border-0 border-b border-white/10 px-4 py-3 text-left">Hospital</th>
                      <th className="border-0 border-b border-white/10 px-4 py-3 text-left">Department</th>
                      <th className="border-0 border-b border-white/10 px-4 py-3 text-left">Doctor</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-100">
                    {displayAppointments.map((appointment, idx) => (
                      <tr key={appointment.id || idx} className="hover:bg-white/5 transition-colors">
                        <td className="border-0 border-b border-white/5 px-4 py-3">{formatTimestamp(appointment.date)}</td>
                        <td className="border-0 border-b border-white/5 px-4 py-3">{appointment.hospital || 'N/A'}</td>
                        <td className="border-0 border-b border-white/5 px-4 py-3">{appointment.department || 'N/A'}</td>
                        <td className="border-0 border-b border-white/5 px-4 py-3">{appointment.with_who || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white/5 p-6 rounded-xl text-center text-white">
                <p className="mb-2">No upcoming appointments scheduled.</p>
                <p className="text-sm text-gray-300">Use the button below to schedule your first appointment.</p>
              </div>
            )}
            
            <div className="mt-8">
              <Link 
                to="/appointments/new" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
              >
                Schedule New Appointment
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;