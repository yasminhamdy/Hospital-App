
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required:true
    },
    email: {
        type: String,
        unique: true
    },
    telNumber: {
        type: Number,
    }
});

const Patients = mongoose.model('Patient' , PatientSchema);

module.exports = Patients;