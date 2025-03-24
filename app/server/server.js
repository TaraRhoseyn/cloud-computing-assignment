const express = require('express');
const bodyParser = require('body-parser')
const getMatchData = require('./getDataFromDatabase');
const  postData  = require('./postDataToDatabase');
const saveMatchResult = require('./saveMatch');
const deleteData = require('./deleteDataFromDatabase');
const cors = require('cors');
const app = express();
const updateData = require('./updateDataToDatabase')


const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.get('/api', (req, res) => {
	res.json(
		{
			"users": [
				"user1",
				"user2",
				"user3"
			]
		}
	)
})

app.use(cors({
	origin: 'http://localhost:3000'
}));


app.delete('/api/matches/:matchId', async (req, res) => {
	try {
		const matchId = req.params.matchId;
		// Call the deleteData function with the matchId
		await deleteData(matchId);
		res.json([{ message: 'Match deleted successfully' }]);
	} catch (error) {
		console.error('Error deleting match:', error);
		res.status(500).json({ message: 'Error deleting match' });
	}
});

// ADD FUNC TO UPDATE MATCH...

app.get('/api/matches', async (req, res) => {
	try {
		const matches = await getMatchData(); // Call the getMatchData function
		res.json(matches); // Send the retrieved matches as a JSON response
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error retrieving matches' });
	}
});

app.post('/api/matches', async (req, res) => {
	// this could do with a lot of refactoring...
	// need a way to send an error msg to user on frontend
	try {
		const player1Set1Games = parseInt(req.body.player1Set1Games);
		const player2Set1Games = parseInt(req.body.player2Set1Games);
		const player1Set2Games = parseInt(req.body.player1Set2Games);
		const player2Set2Games = parseInt(req.body.player2Set2Games);
		const player1Set3Games = parseInt(req.body.player1Set3Games);
		const player2Set3Games = parseInt(req.body.player2Set3Games);



		// Call the saveMatchResult function with data from the request body

		// returns an object
		let matchData = await saveMatchResult(
			req.body.player1,
			req.body.player2,
			player1Set1Games,
			player2Set1Games,
			player1Set2Games,
			player2Set2Games,
			player1Set3Games,
			player2Set3Games
		);


		// Posts data to DB:
		matchData ? await postData(matchData) : res.json([{ message: `An error has occurred and the match cannot be saved. Please try again:` }]);
		res.json([{ message: 'Match added successfully' }]);
	} catch (error) {
		console.error('Error adding match:', error);
		res.json([{ message: `Error adding match ${error}` }]);
	}
});

app.put('/api/matches/:matchId', async (req, res) => {
	try {
		const matchId = req.params.matchId;
		const player1Set1Games = parseInt(req.body.player1Set1);
        const player2Set1Games = parseInt(req.body.player2Set1);
        const player1Set2Games = parseInt(req.body.player1Set2);
        const player2Set2Games = parseInt(req.body.player2Set2);
        const player1Set3Games = parseInt(req.body.player1Set3);
        const player2Set3Games = parseInt(req.body.player2Set3);
		// const updatedData = req.body; // Assuming the request body contains the updated match data
		let matchData = await saveMatchResult(
			req.body.player1,
			req.body.player2,
			player1Set1Games,
			player2Set1Games,
			player1Set2Games,
			player2Set2Games,
			player1Set3Games,
			player2Set3Games
		);
		await updateData(matchId, matchData);
		res.json([{ message: 'Match updated successfully' }]);
	} catch (error) {
		console.error('Error updating match:', error);
		res.status(500).json({ message: 'Error updating match' });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log('Environment variables:', {
		APIKEY: process.env.APIKEY,
		AUTHDOMAIN: process.env.AUTHDOMAIN,
		PROJECTID: process.env.PROJECTID,
		STORAGEBUCKET: process.env.STORAGEBUCKET,
		MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
		APPID: process.env.APPID
	  });
});

module.exports = app;