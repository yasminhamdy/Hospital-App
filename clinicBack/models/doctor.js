const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    speciality: {
        type: String
    },
    availableDays: [String],
    startHour: {
        type: Number
    },
    endHour: {
        type: Number
    },
    data:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Doctors = mongoose.model('Doctor' , DoctorSchema);

module.exports = Doctors;