const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RequestSchema = new Schema({
    doctorID : {
        type:String
    },
    doctorName : {
        type:String
    },
    patientID : {
        type:String
    },
    patientName : {
        type:String
    },
    city:{
        type:String
    },
    day:{
        type:String
    },
    hour:
    {
        type:Number
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
});

const Requests = mongoose.model('Request' , RequestSchema);
module.exports = Requests;