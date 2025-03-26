// Mock the database config module
jest.mock('./databaseConfig', () => ({
    collection: jest.fn().mockReturnThis(),
    add: jest.fn().mockResolvedValue({ id: 'test-appointment-id' })
  }));
  
  // Import the function to test
  const postAppointment = require('./postDataToDatabase');
  const db = require('./databaseConfig');
  
  describe('postAppointment function', () => {
    // Reset mocks before each test
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should successfully add an appointment and return it with an ID', async () => {
      // Setup
      const appointmentData = {
        hospital: 'Test Hospital',
        department: 'Cardiology',
        with_who: 'Dr. Smith',
        date: new Date('2025-04-01')
      };
  
      // Execute
      const result = await postAppointment(appointmentData);
  
      // Verify
      expect(db.collection).toHaveBeenCalledWith('appointments');
      expect(db.add).toHaveBeenCalledWith(appointmentData);
      expect(result).toEqual({
        id: 'test-appointment-id',
        ...appointmentData
      });
    });
  
    it('should throw an error when the database operation fails', async () => {
      // Setup
      const appointmentData = {
        hospital: 'Test Hospital',
        department: 'Cardiology',
        with_who: 'Dr. Smith',
        date: new Date('2025-04-01')
      };
  
      // Mock the add function to throw an error
      db.add.mockRejectedValueOnce(new Error('Database error'));
  
      // Execute and verify
      await expect(postAppointment(appointmentData)).rejects.toThrow('Database error');
    });
  });