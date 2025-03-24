const fetchAllMatchesFromAPI = async () => {
	try {
		const response = await fetch("/api/matches");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching matches: ", error)
	}
}

module.exports = fetchAllMatchesFromAPI;