const request = require('supertest');
const app = require('./server');
const saveMatchResult = require('./saveMatch');
const postData = require('./postDataToDatabase');


jest.mock('./postDataToDatabase');
jest.mock('./saveMatch');
// jest.mock('./Match');

describe('Integration Test Suite', () => {
    it('TC_28: ', async () => {
        // Create a mock match data
        const mockMatchData = {
            player1: 'Yasmine',
            player2: 'Tati',
            player1Set1Games: 6,
            player2Set1Games: 0,
            player1Set2Games: 6,
            player2Set2Games: 0,
            player1Set3Games: 0,
            player2Set3Games: 0
        };

        saveMatchResult.mockImplementation(async () => {
            return { message: 'Match added successfully' };
        });

        postData.mockImplementation(async () => {
			return { message: 'Mock database operation: Match data posted successfully' };
        });

        const res = await request(app)
            .post('/api/matches')
            .send(mockMatchData);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ message: 'Match added successfully' }]);
		expect(saveMatchResult).toHaveBeenCalled();
        expect(postData).toHaveBeenCalled();
    });

	it('TC_29: saveMatchResult should call Match', async () => {
        // Mock the parameters for saveMatchResult
        const player1 = 'Yasmine';
        const player2 = 'Tati';
        const player1Set1Games = 6;
        const player2Set1Games = 0;
        const player1Set2Games = 6;
        const player2Set2Games = 0;
        const player1Set3Games = 0;
        const player2Set3Games = 0;

        // Call the saveMatchResult function
        await saveMatchResult(
            player1,
            player2,
            player1Set1Games,
            player2Set1Games,
            player1Set2Games,
            player2Set2Games,
            player1Set3Games,
            player2Set3Games
        );

    });
});

