const express = require('express');
const bodyParser = require('body-parser');
const postAppointment = require('./postDataToDatabase');
const { getRecords, getAppointments } = require('./getDataFromDatabase');
const cors = require('cors');


// Create Express app
const app = express();
const port = process.env.PORT || 8080;

// Apply middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  // Test func to ensure API is running
  res.status(200).send('API is running');
});

app.get('/test', (req, res) => {
  // Test func to ensure API endpoints are working
	res.status(200).json({ message: 'Test endpoint is working' });
  });

  app.get('/test-db', async (req, res) => {
	try {
	  const db = require('./databaseConfig');
	  await db.collection('test').doc('test').set({
		test: 'Connection test at ' + new Date().toISOString()
	  });
	  res.status(200).json({ message: 'Database connection successful' });
	} catch (err) {
	  console.error('Database connection test failed:', err);
	  res.status(500).json({ 
		message: 'Database connection failed',
		error: err.message
	  });
	}
  });

app.get('/api/records', async (req, res) => {
	try {
	  console.log('Fetching records...');
	  const records = await getRecords();
	  console.log('Records fetched successfully:', records.length);
	  res.json(records);
	} catch (err) {
	  console.error('Detailed error in /api/records:', err);
	  res.status(500).json({ 
		message: 'Error retrieving records',
		error: err.message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
	  });
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
    if (!appointmentData.hospital || !appointmentData.department || 
        !appointmentData.with_who || !appointmentData.date) {
      return res.status(400).json({ message: 'Missing required appointment information' });
    }
    
    // Convert date string to Firestore timestamp
    if (appointmentData.date) {
      const dateObj = new Date(appointmentData.date);
      const { Timestamp } = require('firebase-admin/firestore');
      appointmentData.date = Timestamp.fromDate(dateObj);
    }
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