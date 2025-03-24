const db = require('./databaseConfig');

async function getMatchData() {
	const matchesCollection = db.collection('matches');
	// Get all documents in the collection (you can also query for specific documents)
	const matchDocs = await matchesCollection.get();

	// Create an empty array to store the retrieved match data
	const matches = [];

	// Loop through each document in the collection
	matchDocs.forEach(doc => {
		// Get the data for each document
		const matchData = doc.data();

		// Add an ID field to the data (optional)
		matchData.id = doc.id;

		// Push the data object to the "matches" array
		matches.push(matchData);
	});

	// Return the array of match data
	return matches;
};


module.exports = getMatchData;
