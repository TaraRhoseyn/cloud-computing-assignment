async function fetchDataFromAPI() {
	try {
	  const response = await fetch('http://localhost:5000/api/records');
	  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
	  
	  const data = await response.json();
	  console.log('API response:', data); // Debug log
	  return data;
	} catch (error) {
	  console.error('Error fetching data:', error);
	  throw error;
	}
  }

module.exports = fetchDataFromAPI;