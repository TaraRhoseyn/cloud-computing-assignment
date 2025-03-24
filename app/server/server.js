const express = require('express');
const bodyParser = require('body-parser')
const getRecords = require('./getDataFromDatabase');
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
		res.json(records); // Send the retrieved data as a JSON response
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error retrieving records' });
	}
});


app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;