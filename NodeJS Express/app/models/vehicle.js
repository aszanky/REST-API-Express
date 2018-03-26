const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// by convention variable is upper 
let VehicleSchema = new Schema({
    make: String,
    model: String,
    color: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);