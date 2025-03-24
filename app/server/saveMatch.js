const Match = require('./Match');

async function saveMatchResult(
	player1,
	player2,
	player1Set1Games,
	player2Set1Games,
	player1Set2Games,
	player2Set2Games,
	player1Set3Games,
	player2Set3Games
) {
	// Create a Match object
	const match = new Match(player1, player2);
	// adds set 1 results
	match.addSet(player1, 1, player1Set1Games);
	match.addSet(player2, 1, player2Set1Games);
	// adds set 2 results
	match.addSet(player1, 2, player1Set2Games);
	match.addSet(player2, 2, player2Set2Games);
	// adds set 3 results if there is one
	if (player1Set3Games && player2Set3Games) {
		match.addSet(player1, 3, player1Set3Games);
		match.addSet(player2, 3, player2Set3Games);
	}
	// calculates match winner:
	let matchData = {
		players: {
			player1: match.player1,
			player2: match.player2,
		},
		sets: [
			{
				number: 1,
				player1Score: match.player1Set1Games,
				player2Score: match.player2Set1Games,
				winner: match.calcSetWinner(1),
			},
			{
				number: 2,
				player1Score: match.player1Set2Games,
				player2Score: match.player2Set2Games,
				winner: match.calcSetWinner(2),
			},
		],
		matchWinner: match.calcMatchWinner()
	};
	// add set 3 if it exists
	if (player1Set3Games && player2Set3Games) {
		matchData.sets.push({
			number: 3,
			player1Score: player1Set3Games,
			player2Score: player2Set3Games,
			winner: match.calcSetWinner(3),
		});
		// recalculates winner if there's a set 3
		matchData.matchWinner = match.calcMatchWinner();
	}
	// performs checks:
	try {
		match.checkSetGameClearance(player1Set1Games, player2Set1Games)
		match.checkSetGameClearance(player1Set2Games, player2Set2Games)
		if (player1Set3Games && player2Set3Games) {
			match.checkSetGameClearance(player1Set3Games, player2Set3Games)
		}
		match.checkForEqualSetGames();
		match.checkMinGames();
	} catch (error) {
		console.error("ERROR - Match results failed validation check: ", error)
		// if error occurs: return an empty object
		matchData = {}
		return
	}
	return matchData
	
}

// Example usage:
// saveMatchResult("Yasmine", "Tati", 6, 0, 6, 0, 0, 0);

module.exports = saveMatchResult;