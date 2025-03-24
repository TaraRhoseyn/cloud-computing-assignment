const Match = require('./Match');

describe('Match Test Suite', () => {

	test('TC_01: Player set result < 0', () => {
		const match = new Match("Yasmine", "Kate");
		expect(() => match.addSet(match.player1, 1, -1)).toThrow(Error);
	});

	test('TC_02: Player set result > 10', () => {
		const match = new Match("Yasmine", "Kate");
		expect(() => match.addSet(match.player1, 1, 11)).toThrow(Error);
	});
	
	test('TC_13: Equal number of games between players in a set', () => {
		const match = new Match("Yasmine", "Kate");
		match.player1Set1Games = 3;
		match.player2Set1Games = 3;
		expect(() => match.checkForEqualSetGames()).toThrow(Error);
	});

	test('TC_14: Player wins set by 1 game', () => {
		const match = new Match("Yasmine", "Kate");
		player1Set1Games = 6;
		player1Set1Games = 5;
		expect(() => match.checkSetGameClearance(player1Set1Games,player1Set1Games)).toThrow(Error);
	});

	test('TC_15: Player wins set by 2 games', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 6);
		match.addSet(match.player2, 1, 4);
		expect(match.calcSetWinner(1)).toBe("Yasmine");
	});

	test('TC_16: Player wins set by 3 games', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 6);
		match.addSet(match.player2, 1, 3);
		expect(match.calcSetWinner(1)).toBe("Yasmine");
	});

	test('TC_20: Each player wins a set each so a third set is given', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 6);
		match.addSet(match.player2, 1, 3);
		match.addSet(match.player1, 2, 3);
		match.addSet(match.player2, 2, 6);
		match.addSet(match.player1, 3, 6);
		match.addSet(match.player2, 3, 2);
		match.calcSetWinner(1)
		match.calcSetWinner(2)
		match.calcSetWinner(3)
		expect(match.calcMatchWinner()).toBe("Yasmine");
	});

	test('TC_18: A fourth set is given', () => {
		const match = new Match("Yasmine", "Kate");
		expect(() => match.addSet(match.player1, 4, 6)).toThrow(Error);
	});

	test('TC_19: Each player wins only 1 set each', () => {
		const match = new Match("Yasmine", "Kate");
		match.set1Winner = match.player1;
		match.set2Winner = match.player2;
		expect(() => match.calcMatchWinner()).toThrow(Error);
	});

	test('TC_21: One player wins all three sets', () => {
		const match = new Match("Yasmine", "Kate");
		match.set1Winner = match.player1;
		match.set2Winner = match.player1;
		match.set3Winner = match.player1;
		expect(() => match.calcMatchWinner()).toThrow(Error);
	});

	test('TC_03: Player set result = 1', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 1);
		match.addSet(match.player2, 1, 4);
		winner = match.calcSetWinner(1)
		expect(winner).toBe("Kate");
	});

	test('TC_04: Player set result = 10', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 10);
		match.addSet(match.player2, 1, 4);
		winner = match.calcSetWinner(1)
		expect(winner).toBe("Yasmine");
	});

	test('TC_05: Winning player in a set has 4 games', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 4);
		match.addSet(match.player2, 1, 0);
		match.addSet(match.player1, 2, 4);
		match.addSet(match.player2, 2, 0);
		match.checkMinGames();
		winner = match.calcSetWinner(1)
		expect(winner).toBe("Yasmine");
	});

	test('TC_06: Winning player in a set has < 4 games', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 4);
		match.addSet(match.player2, 1, 0);
		match.addSet(match.player1, 2, 3);
		match.addSet(match.player2, 2, 0);
		expect(() => match.checkMinGames()).toThrow(Error);
	});

	test('TC_27: Winning player in a set has < 4 games (set 3)', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 5);
		match.addSet(match.player2, 1, 1);

		match.addSet(match.player1, 2, 5);
		match.addSet(match.player2, 2, 1);

		match.addSet(match.player1, 3, 3);
		match.addSet(match.player2, 3, 1);

		expect(() => match.checkMinGames()).toThrow(Error);
	});

	test('TC_07: Winning player in a set has 10 games', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 10);
		match.addSet(match.player2, 1, 5);
		winner = match.calcSetWinner(1)
		expect(winner).toBe("Yasmine");
	});

	test('TC_08: Winning player in a set has > 10 games', () => {
		const match = new Match("Yasmine", "Kate");
		expect(() => match.addSet(match.player1, 1, 11)).toThrow(Error);
	});

	test('TC_09: Losing player in a set has < 0 games', () => {
		const match = new Match("Yasmine", "Kate");
		expect(() => match.addSet(match.player1, 1, -5)).toThrow(Error);
	});

	test('TC_10: Losing player in a set has 0 games', () => {
		const match = new Match("Yasmine", "Kate");

		match.addSet(match.player1, 1, 0);
		match.addSet(match.player2, 1, 6);
		match.calcSetWinner(1)
		match.addSet(match.player1, 2, 0);
		match.addSet(match.player2, 2, 6);
		match.calcSetWinner(2)
		match.checkMinGames();
		winner = match.calcMatchWinner()
		expect(winner).toBe("Kate");
	});

	test('TC_11: Losing player in a set has 8 games', () => {
		const match = new Match("Yasmine", "Kate");

		match.addSet(match.player1, 1, 8);
		match.addSet(match.player2, 1, 10);
		match.calcSetWinner(1)
		match.addSet(match.player1, 2, 8);
		match.addSet(match.player2, 2, 10);
		match.calcSetWinner(2)
		match.checkMinGames();
		winner = match.calcMatchWinner()
		expect(winner).toBe("Kate");
	});

	test('TC_12: Losing player in a set has > 8 games', () => {
		const match = new Match("Yasmine", "Kate");

		match.addSet(match.player1, 1, 9);
		match.addSet(match.player2, 1, 10);
		match.calcSetWinner(1);
		match.addSet(match.player1, 2, 9);
		match.addSet(match.player2, 2, 10);
		match.calcSetWinner(2);
		expect(() => match.checkMinGames()).toThrow(Error);
	});

	test('TC_17: Only 1 set results given', () => {
		const match = new Match("Yasmine", "Kate");
		match.addSet(match.player1, 1, 3);
		match.addSet(match.player2, 1, 0);
		expect(() => match.calcMatchWinner()).toThrow(Error);
	});

	test('TC_22: Player 2 is 1 character long', () => {
		expect(() => 
		new Match("Yasmine", "T")
		.toThrow(Error))
	});

	test('TC_23: Player 2 is 2-18 characters long', () => {
		const match = new Match("Yasmine", "Kate");
		player2 = match.player2
		expect(player2).toBe("Kate");
	});

	test('TC_24: Player 2 is 19 characters long', () => {
		expect(() => 
		new Match("Yasmine", "incomprehensibility")
		.toThrow(Error))
	});

	test('TC_25: Player 1 is “Yasmine”', () => {
		const match = new Match("Yasmine", "Kate");
		player1 = match.player1
		expect(player1).toBe("Yasmine");
	});

	test('TC_26: Player 1 is not “Yasmine”', () => {
		expect(() => 
		new Match("Michael", "Kate")
		.toThrow(Error))
	});
	
});
