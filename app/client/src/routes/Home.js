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
      // Check if it's a Firestore Timestamp object
      if (timestamp.seconds && timestamp.nanoseconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
      }
      
      // For direct date strings
      if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString();
        }
      }
      
      return String(timestamp);
    } catch (e) {
      console.error("Error formatting timestamp:", e, timestamp);
      return 'Invalid Date';
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

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
        
        {loading ? (
          <div className="flex justify-center py-6">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded text-red-700 mb-4">
            {error}
            <div className="mt-2 text-sm">
              Please check your server connection and database configuration.
            </div>
          </div>
        ) : (
          <>
            {displayAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-4 py-2 text-left">Date</th>
                      <th className="border px-4 py-2 text-left">Hospital</th>
                      <th className="border px-4 py-2 text-left">Department</th>
                      <th className="border px-4 py-2 text-left">Doctor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayAppointments.map((appointment, idx) => (
                      <tr key={appointment.id || idx}>
                        <td className="border px-4 py-2">{formatTimestamp(appointment.date)}</td>
                        <td className="border px-4 py-2">{appointment.hospital || 'N/A'}</td>
                        <td className="border px-4 py-2">{appointment.department || 'N/A'}</td>
                        <td className="border px-4 py-2">{appointment.with_who || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded text-center">
                <p className="mb-2">No upcoming appointments scheduled.</p>
                <p className="text-sm text-gray-500">Use the button below to schedule your first appointment.</p>
              </div>
            )}
            
            <div className="mt-6">
              <Link 
                to="/appointments/new" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Schedule New Appointment
              </Link>
            </div>
          </>
        )}
      </div>
      
      {/* Debug information - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto mt-4">
          <details>
            <summary className="cursor-pointer text-blue-500 font-semibold">Debug Information</summary>
            <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
              <p>Loading state: {loading ? 'true' : 'false'}</p>
              <p>Error: {error || 'None'}</p>
              <p>Appointments count: {appointments.length}</p>
              <pre>{JSON.stringify(appointments, null, 2)}</pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

export default Home;