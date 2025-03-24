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
    
    // Just store the ISO string for now - we'll format it properly in the backend
    if (value) {
      const dateObj = new Date(value);
      if (!isNaN(dateObj.getTime())) {
        setAppointment(prev => ({
          ...prev,
          date: dateObj.toISOString()  // Store as ISO string to preserve the date info
        }));
      }
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
        <div className={`backdrop-blur-md p-4 mb-6 rounded-xl max-w-2xl mx-auto ${
          formSubmitted 
            ? 'bg-green-500/20 text-green-100' 
            : 'bg-red-500/20 text-red-100'
        }`}>
          {message}
        </div>
      )}
      
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-xl border border-white/20 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="hospital">
              Hospital
            </label>
            <select
              id="hospital"
              name="hospital"
              value={appointment.hospital}
              onChange={handleChange}
              className="shadow bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="" className="text-gray-800">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital} className="text-gray-800">
                  {hospital}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-5">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={appointment.department}
              onChange={handleChange}
              className="shadow bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="" className="text-gray-800">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department} className="text-gray-800">
                  {department}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-5">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="with_who">
              Doctor
            </label>
            <select
              id="with_who"
              name="with_who"
              value={appointment.with_who}
              onChange={handleChange}
              className="shadow bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="" className="text-gray-800">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor} className="text-gray-800">
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="date">
              Date and Time
            </label>
            <input
              id="date"
              type="datetime-local"
              onChange={handleDateChange}
              className="shadow bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <p className="text-gray-300 text-xs mt-2">
              Please select your preferred appointment date and time
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full transition-colors shadow-lg"
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