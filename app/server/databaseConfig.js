const admin = require('firebase-admin');

let db;
try {
  admin.app();
  db = admin.firestore();
} catch (error) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
  db = admin.firestore();
  console.log('Firebase Admin initialized in databaseConfig.js');
}

module.exports = db;
