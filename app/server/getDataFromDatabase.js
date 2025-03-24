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

async function getAppointments() {
	try {
	  const appointmentsCollection = db.collection('appointments');
	  const snapshot = await appointmentsCollection.get();
	  
	  if (snapshot.empty) {
		console.log('No appointments found');
		return [];
	  }
	  
	  const appointments = [];
	  
	  snapshot.forEach(doc => {
		appointments.push({
		  id: doc.id,
		  ...doc.data()
		});
	  });
	  
	  console.log('Retrieved appointments:', appointments);
	  return appointments;
	} catch (error) {
	  console.error('Error getting appointments:', error);
	  throw error;
	}
}


module.exports = {
	getRecords,
	getAppointments
  };
