const admin = require('firebase-admin');
const serviceAccount = require('./experts2-38bfa20fceb1.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); 

module.exports = db;




