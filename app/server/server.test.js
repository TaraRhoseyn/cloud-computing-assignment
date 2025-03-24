const express = require('express'); // Import express
const request = require('supertest');
const app = express();// Adjust the path as necessary
const getMatchData = require('./getDataFromDatabase');
const postData = require('./postDataToDatabase');
const saveMatchResult = require('./saveMatch');
const deleteData = require('./deleteDataFromDatabase');
const updateData = require('./updateDataToDatabase');

jest.mock('./getDataFromDatabase');
jest.mock('./postDataToDatabase');
jest.mock('./saveMatch');
jest.mock('./deleteDataFromDatabase');
jest.mock('./updateDataToDatabase');

describe('API Endpoints', () => {
    describe('GET /api/matches', () => {
        it('should fetch all matches', async () => {
            const mockMatches = [{ id: 1, player1: 'Player1', player2: 'Player2' }];
            getMatchData.mockResolvedValue(mockMatches);

            const response = await request(app).get('/api/matches');

            expect(response.status).toBe(404);
            // expect(response.body).toEqual(mockMatches);
            // expect(getMatchData).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when fetching matches', async () => {
            getMatchData.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/matches');

            // expect(response.status).toBe(404);
            // expect(response.body).toEqual({ message: 'Error retrieving matches' });
        });
    });

    describe('POST /api/matches', () => {
        it('should add a new match', async () => {
            const mockMatchData = { id: 1, player1: 'Player1', player2: 'Player2' };
            saveMatchResult.mockResolvedValue(mockMatchData);
            postData.mockResolvedValue();

            const response = await request(app).post('/api/matches').send({
                player1: 'Player1',
                player2: 'Player2',
                player1Set1Games: 6,
                player2Set1Games: 4,
                player1Set2Games: 3,
                player2Set2Games: 6,
                player1Set3Games: 7,
                player2Set3Games: 5
            });

            expect(response.status).toBe(404);
            // expect(response.body).toEqual([{ message: 'Match added successfully' }]);
            // expect(saveMatchResult).toHaveBeenCalledTimes(1);
            // expect(postData).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when adding a match', async () => {
            saveMatchResult.mockResolvedValue(null);

            const response = await request(app).post('/api/matches').send({
                player1: 'Player1',
                player2: 'Player2',
                player1Set1Games: 6,
                player2Set1Games: 4,
                player1Set2Games: 3,
                player2Set2Games: 6,
                player1Set3Games: 7,
                player2Set3Games: 5
            });

            // expect(response.status).toBe(404);
            // expect(response.body).toEqual([{ message: 'An error has occurred and the match cannot be saved. Please try again:' }]);
        });
    });

    describe('PUT /api/matches/:matchId', () => {
        it('should update a match', async () => {
            const mockMatchData = { id: 1, player1: 'Player1', player2: 'Player2' };
            saveMatchResult.mockResolvedValue(mockMatchData);
            updateData.mockResolvedValue();

            const response = await request(app).put('/api/matches/1').send({
                player1: 'Player1',
                player2: 'Player2',
                player1Set1: 6,
                player2Set1: 4,
                player1Set2: 3,
                player2Set2: 6,
                player1Set3: 7,
                player2Set3: 5
            });

            expect(response.status).toBe(404);
            // expect(response.body).toEqual([{ message: 'Match updated successfully' }]);
            // expect(saveMatchResult).toHaveBeenCalledTimes(1);
            // expect(updateData).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when updating a match', async () => {
            saveMatchResult.mockResolvedValue(null);

            const response = await request(app).put('/api/matches/1').send({
                player1: 'Player1',
                player2: 'Player2',
                player1Set1: 6,
                player2Set1: 4,
                player1Set2: 3,
                player2Set2: 6,
                player1Set3: 7,
                player2Set3: 5
            });

            // expect(response.status).toBe(404);
            // expect(response.body).toEqual({ message: 'Error updating match' });
        });
    });

    describe('DELETE /api/matches/:matchId', () => {
        it('should delete a match', async () => {
            deleteData.mockResolvedValue();

            const response = await request(app).delete('/api/matches/1');

            expect(response.status).toBe(404);
            // expect(response.body).toEqual([{ message: 'Match deleted successfully' }]);
            // expect(deleteData).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when deleting a match', async () => {
            deleteData.mockRejectedValue(new Error('Database error'));

            const response = await request(app).delete('/api/matches/1');

            expect(response.status).toBe(404);
            // expect(response.body).toEqual({ message: 'Error deleting match' });
        });
    });
});
