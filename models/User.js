const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    occupation: {
        type: String
    },
    location: {
        ref: 'location',
        type: mongoose.Types.ObjectId
    },
    nickname:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date
    },
    isExpert: {
        type: Boolean
    },
    email: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    versionKey: false
});
var User = mongoose.model('user', userSchema)
module.exports = User