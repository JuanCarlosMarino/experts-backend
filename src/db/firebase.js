const admin = require('firebase-admin');
const serviceAccount = require('./experts-81553-e5f9c727d839.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); 

module.exports = db;




