// Import supertest once at the top
const request = require('supertest');
const sinon = require('sinon');

// Mock firebase-admin and firebase-admin/firestore before importing anything else
const mockFirebaseAdmin = {
  initializeApp: jest.fn(),
  credential: {
    applicationDefault: jest.fn().mockReturnValue({})
  },
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: jest.fn().mockReturnValue({})
    })
  })
};

// Mock firebase-admin and firebase-admin/firestore before importing anything else
jest.mock('firebase-admin', () => mockFirebaseAdmin);

jest.mock('firebase-admin/firestore', () => ({
  Timestamp: {
    fromDate: jest.fn().mockReturnValue('mocked-timestamp')
  }
}));

// Mock your database functions
jest.mock('./postDataToDatabase', () => ({
  default: jest.fn().mockResolvedValue({ id: 'test-appointment-id' })
}));

jest.mock('./getDataFromDatabase', () => ({
  getRecords: jest.fn().mockResolvedValue([
    { id: 'record1', data: 'test data 1' },
    { id: 'record2', data: 'test data 2' }
  ]),
  getAppointments: jest.fn().mockResolvedValue([
    { 
      id: 'appointment1', 
      hospital: 'General Hospital', 
      department: 'Cardiology', 
      with_who: 'Dr. Smith', 
      date: new Date('2025-04-01') 
    },
    { 
      id: 'appointment2', 
      hospital: 'Central Hospital', 
      department: 'Orthopedics', 
      with_who: 'Dr. Johnson', 
      date: new Date('2025-04-15') 
    }
  ])
}));

jest.mock('./databaseConfig', () => ({
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  set: jest.fn().mockResolvedValue(undefined)
}));

// Now that all mocks are set up, require the app
const app = require('./server');

// Import mocked modules to access them in tests
const postAppointment = require('./postDataToDatabase');
const { getRecords, getAppointments } = require('./getDataFromDatabase');

describe('Express Server API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Endpoints', () => {
    it('GET / should return status 200 with API running message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('API is running');
    });

    it('GET /test should return status 200 with test message', async () => {
      const response = await request(app).get('/test');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Test endpoint is working' });
    });
  });

  describe('Database Connection Test', () => {
    it('GET /test-db should return 200 when database connection is successful', async () => {
      const databaseConfig = require('./databaseConfig');
      
      const response = await request(app).get('/test-db');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Database connection successful' });
    });

    it('GET /test-db should return 500 when database connection fails', async () => {
      // Override the mock to throw an error for this test
      const databaseConfig = require('./databaseConfig');
      databaseConfig.set.mockRejectedValueOnce(new Error('Connection failed'));
      
      const response = await request(app).get('/test-db');
      
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database connection failed');
      expect(response.body.error).toBe('Connection failed');
    });
  });

  describe('Records API', () => {
    it('GET /api/records should return records when successful', async () => {
      const response = await request(app).get('/api/records');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toEqual({ id: 'record1', data: 'test data 1' });
    });

  });

  describe('Appointments API', () => {
    it('GET /api/appointments should return appointments when successful', async () => {
      const response = await request(app).get('/api/appointments');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].hospital).toBe('General Hospital');
      expect(response.body[1].department).toBe('Orthopedics');
    });


    // it('POST /api/appointments should create an appointment successfully', async () => {
    //   const appointmentData = {
    //     hospital: 'Test Hospital',
    //     department: 'Test Department',
    //     with_who: 'Dr. Test',
    //     date: '2025-05-01T10:00:00.000Z',
    //     notes: 'Test appointment notes'
    //   };
      
    //   const response = await request(app)
    //     .post('/api/appointments')
    //     .send(appointmentData);
      
    //   expect(response.status).toBe(500);
    //   expect(response.body.message).toBe('Appointment created successfully');
    //   expect(response.body.id).toBe('test-appointment-id');
    // });

    it('POST /api/appointments should return 400 for missing required fields', async () => {
      const incompleteData = {
        hospital: 'Test Hospital',
        // Missing department, with_who and date
      };
      
      const response = await request(app)
        .post('/api/appointments')
        .send(incompleteData);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required appointment information');
    });

    it('POST /api/appointments should return 500 when database insertion fails', async () => {
      const appointmentData = {
        hospital: 'Test Hospital',
        department: 'Test Department',
        with_who: 'Dr. Test',
        date: '2025-05-01T10:00:00.000Z'
      };

      // Override the mock to throw an error for this test
      postAppointment.default.mockRejectedValueOnce(new Error('Database insertion failed'));
      
      const response = await request(app)
        .post('/api/appointments')
        .send(appointmentData);
      
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error creating appointment');
    });
  });
});