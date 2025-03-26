// Mock the database config module
jest.mock('./databaseConfig', () => {
    return {
      collection: jest.fn().mockReturnThis(),
      add: jest.fn().mockResolvedValue({ id: 'mock-appointment-id' })
    };
  });
  
  // Import the function to test
  const postAppointment = require('./postDataToDatabase');
  const db = require('./databaseConfig');
  
  describe('postAppointment', () => {
    // Clear mock data before each test
    beforeEach(() => {
      jest.clearAllMocks();
      // Spy on console.log and console.error
      jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
    });
  
    afterEach(() => {
      // Restore console methods
      console.log.mockRestore();
      console.error.mockRestore();
    });
  
    it('should add appointment data and return it with an ID', async () => {
      // Test data
      const appointmentData = {
        hospital: 'General Hospital',
        department: 'Cardiology',
        with_who: 'Dr. Smith',
        date: new Date('2025-04-15')
      };
  
      // Call the function
      const result = await postAppointment(appointmentData);
  
      // Check db methods were called correctly
      expect(db.collection).toHaveBeenCalledWith('appointments');
      expect(db.add).toHaveBeenCalledWith(appointmentData);
      
      // Verify the returned data
      expect(result).toEqual({
        id: 'mock-appointment-id',
        ...appointmentData
      });
      
      // Verify console.log was called
      expect(console.log).toHaveBeenCalledWith(
        'Added appointment with ID:',
        'mock-appointment-id'
      );
    });
  
    it('should throw an error when database operation fails', async () => {
      // Test data
      const appointmentData = {
        hospital: 'General Hospital',
        department: 'Cardiology',
        with_who: 'Dr. Smith',
        date: new Date('2025-04-15')
      };
  
      // Make the mock throw an error
      const testError = new Error('Database error');
      db.add.mockRejectedValueOnce(testError);
  
      // Verify the function throws the error
      await expect(postAppointment(appointmentData)).rejects.toThrow('Database error');
      
      // Verify console.error was called
      expect(console.error).toHaveBeenCalledWith('Error adding appointment:', testError);
    });
  });