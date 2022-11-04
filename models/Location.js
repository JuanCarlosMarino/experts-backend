const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },    
}, {
    collection: 'locations',
    versionKey: false
});
var Location = mongoose.model('location', userSchema)
module.exports = Location