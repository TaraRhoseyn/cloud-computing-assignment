const express = require('express');
const bodyParser = require('body-parser');
const postAppointment = require('./postDataToDatabase'); // Assuming this exports the function you need
const { getRecords, getAppointments } = require('./getDataFromDatabase');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Create Express app
const app = express();
const port = process.env.PORT || 8080;

// Apply middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://patient-portal-f82ad.web.app'
}));

// Simple health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.get('/api/records', async (req, res) => {
  try {
    const records = await getRecords();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving records' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointmentData = { ...req.body };
    
    // Basic validation
    if (!appointmentData.hospital || !appointmentData.department || 
        !appointmentData.with_who || !appointmentData.date) {
      return res.status(400).json({ message: 'Missing required appointment information' });
    }
    
    // Convert date string to Firestore timestamp
    if (appointmentData.date) {
      // Create a Firestore timestamp
      const dateObj = new Date(appointmentData.date);
      
      // Use the actual Firestore timestamp type
      const { Timestamp } = require('firebase-admin/firestore');
      appointmentData.date = Timestamp.fromDate(dateObj);
    }
    
    // Use the correct function name based on your imports
    const result = await postAppointment(appointmentData);
    
    res.status(201).json({
      id: result.id,
      message: 'Appointment created successfully'
    });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;