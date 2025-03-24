const postData = require('./postDataToDatabase');
const db = require('./databaseConfig');
const saveMatchResult = require('./saveMatch');

describe('Database Test Suite', () => {
    let mockAdd;
    let mockCollection;

    beforeEach(() => {
        mockAdd = jest.fn();
        mockCollection = jest.fn().mockReturnValue({ add: mockAdd });
        jest.mock('./databaseConfig', () => ({
            collection: mockCollection
        }));
    });

    it('TC_30: Should post data to DB with returned obj from saveMatchResult()', async () => {
		let mockData = await saveMatchResult("Yasmine", "Tati",6,0,6,0,6,0);
        await expect(postData(mockData));
    });

    // Add other test cases as needed
});
