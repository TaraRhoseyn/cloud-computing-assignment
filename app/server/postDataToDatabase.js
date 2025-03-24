const db = require('./databaseConfig');

async function postAppointment(appointmentData) {
	try {
	  const appointmentsCollection = db.collection('appointments');
	  const result = await appointmentsCollection.add(appointmentData);
	  
	  console.log('Added appointment with ID:', result.id);
	  return {
		id: result.id,
		...appointmentData
	  };
	} catch (error) {
	  console.error('Error adding appointment:', error);
	  throw error;
	}
}


module.exports = postAppointment;