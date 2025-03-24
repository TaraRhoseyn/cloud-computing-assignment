const db = require('./databaseConfig');

async function deleteData(id) {
	try {
		await db.collection("matches").doc(id).delete()
	} catch (error) {
		console.error('Error when trying to delete match from database: ', error)
	}

}
module.exports = deleteData;