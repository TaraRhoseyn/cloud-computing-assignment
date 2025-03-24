const express = require('express');
const bodyParser = require('body-parser');
const postAppointment = require('./postDataToDatabase');
const { getRecords, getAppointments } = require('./getDataFromDatabase');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(cors({
	origin: 'http://localhost:3000'
}));



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
		const appointmentData = req.body;

		// Basic validation
		if (!appointmentData.hospital || !appointmentData.department ||
			!appointmentData.with_who || !appointmentData.date) {
			return res.status(400).json({ message: 'Missing required appointment information' });
		}

		// Add appointment to database
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
	console.log(`Server listening on port ${port}`);
});

module.exports = app;