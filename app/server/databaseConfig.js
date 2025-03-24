const admin = require('firebase-admin');

// Check if Firebase Admin has been initialized already
let db;
try {
  // Try to get the existing app
  admin.app();
  // If we get here, the app exists already
  db = admin.firestore();
} catch (error) {
  // App doesn't exist yet, initialize it
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
  db = admin.firestore();
  console.log('Firebase Admin initialized in databaseConfig.js');
}

module.exports = db;