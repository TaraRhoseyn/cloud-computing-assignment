import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heading1 from "../components/Heading1";
import LoadingSpinner from "../components/LoadingSpinner";

function AddAppointment() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    department: "",
    hospital: "",
    with_who: "",
    date: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Predefined lists for dropdowns
  const hospitals = [
    "University of South Wales Hospital",
    "Cardiff Royal Infirmary",
    "Llandough Hospital",
    "Velindre Cancer Centre",
    "Royal Glamorgan Hospital"
  ];

  const doctors = [
    "Dr. Michael Chen",
    "Dr. Sarah Williams",
    "Dr. James Wilson",
    "Dr. Lisa Rodriguez",
    "Dr. Robert Thompson"
  ];

  const departments = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Rheumatology",
    "Urology"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    // Convert to a format that Firebase can store
    const dateObj = new Date(value);
    
    if (!isNaN(dateObj.getTime())) {
      setAppointment(prev => ({
        ...prev,
        date: {
          seconds: Math.floor(dateObj.getTime() / 1000),
          nanoseconds: 0
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      // Validate form
      if (!appointment.department || !appointment.hospital || !appointment.with_who || !appointment.date) {
        setMessage("Please fill in all fields");
        setLoading(false);
        return;
      }
      
      // Submit appointment to API
      await axios.post("http://localhost:5000/api/appointments", appointment);
      
      setMessage("Appointment scheduled successfully!");
      setFormSubmitted(true);
      setLoading(false);
      
      // Reset form after successful submission
      setAppointment({
        department: "",
        hospital: "",
        with_who: "",
        date: ""
      });
      
      // Navigate back to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setMessage("Failed to schedule appointment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-white flex justify-center items-center my-10">
        <Heading1>Schedule New Appointment</Heading1>
      </div>
      
      {message && (
        <div className={`p-4 mb-6 rounded max-w-2xl mx-auto ${formSubmitted ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospital">
              Hospital
            </label>
            <select
              id="hospital"
              name="hospital"
              value={appointment.hospital}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={appointment.department}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="with_who">
              Doctor
            </label>
            <select
              id="with_who"
              name="with_who"
              value={appointment.with_who}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date and Time
            </label>
            <input
              id="date"
              type="datetime-local"
              onChange={handleDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Please select your preferred appointment date and time
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : "Schedule Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAppointment;