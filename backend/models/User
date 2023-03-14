const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true},
    number: { type: String, required: true},
    authorized: { type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);