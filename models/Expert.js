const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let expertSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    occupation: {
        type: Number
    },
    location: {
        type: String
    }
}, {
    collection: 'experts'
});
var Expert = mongoose.model('expert', expertSchema)
module.exports = Expert