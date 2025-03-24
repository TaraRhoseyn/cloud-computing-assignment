const db = require('./databaseConfig');



async function updateData(id, data) {
	try {
		await db.collection("matches").doc(id).update(data)
	} catch (error) {
		console.error('Error when trying to update match in the database: ', error)
	}

}
module.exports = updateData;