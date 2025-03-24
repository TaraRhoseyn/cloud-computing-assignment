const saveMatchResult = require('./saveMatch');
const Match = require('./Match');

jest.mock('./Match');

describe('Save Match Result Test Suite', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and methods before each test
        Match.mockClear();
    });

    it('TC_31: Should create a new Match object', async () => {
        // Call the saveMatchResult function
        await saveMatchResult("Yasmine", "Tati", 6, 0, 6, 0, 0, 0);
        
        // Verify if the Match constructor was called with the correct arguments
        expect(Match).toHaveBeenCalledWith("Yasmine", "Tati");
    });

    it('TC_32: Should call addSet method for each set', async () => {
        // Call the saveMatchResult function
        await saveMatchResult("Yasmine", "Tati", 6, 0, 6, 0, 0, 0);
        
        // Verify if the addSet method was called for each set
        const mockInstance = Match.mock.instances[0];
        expect(mockInstance.addSet).toHaveBeenCalledTimes(4); // Assuming there are 6 sets
        // You may need to adjust this depending on the actual number of sets
    });

    it('TC_33: Should call calcSetWinner method for each set', async () => {
        // Call the saveMatchResult function
        await saveMatchResult("Yasmine", "Tati", 6, 0, 6, 0, 0, 0);
        
        // Verify if the calcSetWinner method was called for each set
        const mockInstance = Match.mock.instances[0];
        expect(mockInstance.calcSetWinner).toHaveBeenCalledTimes(2); // Assuming there are 6 sets
        // You may need to adjust this depending on the actual number of sets
    });

    it('TC_34: Should call calcMatchWinner method', async () => {
        // Call the saveMatchResult function
        await saveMatchResult("Yasmine", "Tati", 6, 0, 6, 0, 0, 0);
        
        // Verify if the calcMatchWinner method was called
        const mockInstance = Match.mock.instances[0];
        expect(mockInstance.calcMatchWinner).toHaveBeenCalled();
    });

    // Add more test cases as needed to cover other aspects of the function
});
