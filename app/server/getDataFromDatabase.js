const db = require('./databaseConfig');

async function getRecords() {
	try {
	  const recordsCollection = db.collection('records');
	  const snapshot = await recordsCollection.get();
	  
	  if (snapshot.empty) {
		console.log('No matching documents found');
		return [];
	  }
	  
	  const records = [];
	  
	  snapshot.forEach(doc => {
		// Include both the document ID and data
		records.push({
		  id: doc.id,
		  ...doc.data()
		});
	  });
	  
	  console.log('Retrieved records:', records); // Debug log
	  return records;
	} catch (error) {
	  console.error('Error getting documents:', error);
	  throw error;
	}
  }


module.exports = getRecords;
