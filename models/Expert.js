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
        type: String
    },
    location: {
        type: String
    }
}, {
    collection: 'experts',
    versionKey: false
});
var Expert = mongoose.model('expert', expertSchema)
module.exports = Expert