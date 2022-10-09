const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusSchema = new Schema({
    campus_name: String,
    location: String,
    image: String,
    description: String
})

const Campus = mongoose.model('Campus', campusSchema);

module.exports = Campus;