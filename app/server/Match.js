class Match {

	constructor(player1, player2) {
		// players:
		if (player1 != "Yasmine") {
			throw new Error("ERROR - Player 1 must be 'Yasmine'")
		} else {
			this.player1 = player1;
		}
		
		if (player2.length < 2 || player2.length > 18) {
			throw new Error("ERROR - Player 2 name must be between 2 and 18 characters long.");
		} else {
			this.player2 = player2;
		}
		
		// set scores:
		this.player1Set1Games = 0;
		this.player2Set1Games = 0;
		this.player1Set2Games = 0;
		this.player2Set2Games = 0;
		this.player1Set3Games = 0;
		this.player2Set3Games = 0;
		// winners:
		this.set1Winner;
		this.set2Winner;
		this.set3Winner;
		this.matchWinner;
	};

	addSet(player, set, score) {
		if (score < 0 || score > 10) {
			throw new Error("ERROR: The number of games won in each set must be between 0 and 10. ${score} is not an acceptable input.")
		}
		switch (set) {
			case 1:
				if (player === this.player1) {
					this.player1Set1Games = score;
				} else if (player === this.player2) {
					this.player2Set1Games = score;
				}
				// player === this.player1 ? this.player1Set1Games = score : this.player2Set1Games = score;
				break;
			case 2:
				if (player === this.player1) {
					this.player1Set2Games = score;
				} else if (player === this.player2) {
					this.player2Set2Games = score;
				}
				// player === this.player1 ? this.player1Set2Games = score : this.player2Set2Games = score;
				break;
			case 3:
				if (player === this.player1) {
					this.player1Set3Games = score;
				} else if (player === this.player2) {
					this.player2Set3Games = score;
				}
				// player === this.player1 ? this.player1Set3Games = score : this.player2Set3Games = score;
				break;
			default:
				throw new Error("ERROR: Set number must be 1, 2, or 3. ${set} is not an acceptable input.");
		}
	}

	calcSetWinner(set) {
		switch (set) {
			case 1:
				this.set1Winner = this.player1Set1Games > this.player2Set1Games ? this.player1 : this.player2;
				if ((this.set1Winner === this.player1 && (this.player1Set1Games < 4 || this.player1Set1Games > 10)) ||
						(this.set1Winner === this.player2 && (this.player2Set1Games < 4 || this.player2Set1Games > 10))) {
						throw new Error("ERROR - Winning player's games are not within the valid range (4 to 10).");
					}
				return this.set1Winner;
			case 2:
				this.set2Winner = this.player1Set2Games > this.player2Set2Games ? this.player1 : this.player2;
				if ((this.set2Winner === this.player1 && (this.player1Set2Games < 4 || this.player1Set2Games > 10)) ||
						(this.set2Winner === this.player2 && (this.player2Set2Games < 4 || this.player2Set2Games > 10))) {
						throw new Error("ERROR - Winning player's games are not within the valid range (4 to 10).");
					}
				return this.set2Winner;
			case 3:
				this.set3Winner = this.player1Set3Games > this.player2Set3Games ? this.player1 : this.player2;
				if ((this.set3Winner === this.player1 && (this.player1Set3Games < 4 || this.player1Set3Games > 10)) ||
						(this.set3Winner === this.player2 && (this.player2Set3Games < 4 || this.player2Set3Games > 10))) {
						throw new Error("ERROR - Winning player's games are not within the valid range (4 to 10).");
					}
				return this.set3Winner;
		}
	}

	calcMatchWinner() {
		if (!this.set2Winner) {
			throw new Error("ERROR - Only Set 1 results given")
		}
		let setWinners = this.set3Winner ? [this.set1Winner, this.set2Winner, this.set3Winner] : [this.set1Winner, this.set2Winner]
		let p1WinCount = 0, p2WinCount = 0;
		for (let i=0; i < setWinners.length; i++) {
			if (setWinners[i] === this.player1) {
				p1WinCount ++;
			} else {
				p2WinCount ++;
			}
		}
		if (p1WinCount === 3 || p2WinCount === 3) {
			throw new Error("ERROR - One player cannot win all 3 sets")
		}
		if (p1WinCount === 1 && p2WinCount === 1) {
			throw new Error("ERROR - If there's only 2 sets played 1 player must win both sets.")
		}
		if (p1WinCount === 2 ) {
			this.matchWinner = this.player1;
		} else {
			this.matchWinner = this.player2;
		}
		return this.matchWinner;
	
	}


	checkMinGames() {
		// Winner of set must have won a minimum of 4 games
		const minGames = 4;


		const set1WinningGames = this.player1Set1Games > this.player2Set1Games ? this.player1Set1Games : this.player2Set1Games;
		const set2WinningGames = this.player1Set2Games > this.player2Set2Games ? this.player1Set2Games : this.player2Set2Games;
		
		if (set1WinningGames === this.player1Set1Games) {
			var set1LosingGames = this.player2Set1Games;
		} else {
			var set1LosingGames = this.player1Set1Games;
		}
		if (set1LosingGames < 0) {
			throw new Error("ERROR - Losing games cannot be less than 0.")
		} else if (set1LosingGames > 8) {
			throw new Error("ERROR - Losing games cannot be higher than 8.")
		}

		if (set2WinningGames === this.player1Set2Games) {
			let set2LosingGames = this.player2Set2Games;
			if (set2LosingGames < 0) {
				throw new Error("ERROR - Losing games cannot be less than 0.")
			} else if (set2LosingGames > 8) {
				throw new Error("ERROR - Losing games cannot be higher than 8.")
			}
		}

		// const set1LosingGames = set1WinningGames === this.player1Set1Games ? this.player1Set1Games : this.player2Set1Games;
		// const set2LosingGames = set2WinningGames === this.player1Set2Games ? this.player1Set2Games : this.player2Set2Games;


		// if ((set1LosingGames < 0 || set1LosingGames > 8)|| (set2LosingGames < 0 || set2LosingGames > 8)) {
		// 	throw new Error("ERROR - The loser of a set must have between 0 and 8 games.")
		// }
		if (set1WinningGames < minGames || set2WinningGames < minGames) {
			throw new Error("ERROR - The winner of a set must have at won at least 4 games.")
		}
		// need to refactor this...have bool value to check if set 3 exists to reuse?
		if (this.player1Set3Games && this.player2Set3Games) {
			const set3WinningGames = this.player1Set3Games > this.player2Set3Games ? this.player1Set3Games : this.player2Set3Games;
			const set3LosingGames = set3WinningGames === this.player1Set3Games ? this.player1Set3Games : this.player2Set3Games;
			if (set3LosingGames < 0 || set3LosingGames > 8) {
				throw new Error("ERROR - The loser of a set must have between 0 and 8 games.")
			}
			if (set3WinningGames < minGames) {
				throw new Error("ERROR - The winner of a set must have at won at least 4 games.")
			}
		}

	}

	checkSetGameClearance(player1Games, player2Games) {
		// Winner must have at least 2 games clear to have a valid win
		const actualGameDifference = Math.abs(player1Games - player2Games)
		if (actualGameDifference < 2) {
			throw new Error("ERROR - There must be at least a 2 game difference within sets.")
		}

	}

	checkForEqualSetGames() {
		// Players cannot have an equal number of games within sets
		if (this.player1Set1Games === this.player2Set1Games) {
			throw new Error("ERROR - Each player has scored the same number of games for Set 1. This is invalid.")
		}
		if (this.player1Set2Games === this.player2Set2Games) {
			throw new Error("ERROR - Each player has scored the same number of games for Set 2. This is invalid.")
		}
		if (this.player1Set3Games && this.player1Set3Games) {
			if (this.player1Set3Games == this.player1Set3Games) {
				throw new Error("ERROR - Each player has scored the same number of games for Set 3. This is invalid.")
			}
		}

	}


}

module.exports = Match;