const db = require('./databaseConfig');


/*
Takes in an object containing match data
and posts it to a Firebase database using
database function defined in databaseConfig.js
*/
async function postData(matchData) {
	await db
	.collection("matches").add(matchData)
	.catch((error) => {
		console.error("Error adding match data:", error);
	});
}


module.exports = postData;