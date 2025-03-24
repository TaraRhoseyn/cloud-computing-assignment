require("dotenv").config()
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTHDOMAIN,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGINGSENDERID,
	appId: process.env.APPID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
module.exports = db;
