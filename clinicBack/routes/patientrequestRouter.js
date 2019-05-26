const express = require('express');
const patientRequestRouter = express.Router();
const patientRequestModel = require('../models/request');


patientRequestRouter.route('/')
.get((request,response) => {
    patientRequestModel.find({})
    .then((requests) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(requests);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((request,response) => {
    let patientRequest = new patientRequestModel({
        doctorID : request.body.doctorID,
        doctorName : request.body.doctorName,
        patientID : request.body.patientID,
        patientName : request.body.patientName,
        city:request.body.city,
        day:request.body.day,
        hour:request.body.hour
    });
    patientRequest.save((error) => {
        if(!error)
        {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(patientRequest);        
        }
        else
        {
            console.log(error.message);
        }
    })
});


patientRequestRouter.route('/:ID')
.get((request,response,next) => {
    console.log(request.params.ID);
    patientRequestModel.find({ $or : [ { doctorID: request.params.ID }, { patientID: request.params.ID } ] })
    .then((requests) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(requests);
    }, (err) => next(err))
    .catch((err) => next(err))
})

.delete((request,response,next) => {
    console.log(request.params.ID);
    patientRequestModel.find({ $or : [ { doctorID: request.params.ID }, { patientID: request.params.ID } ] }).remove()
    .then((request) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(request);
    }, (err) => next(err))
    .catch((err) => next(err))
})

patientRequestRouter.route('/acceptRequest/:ID')
.put((request,response) => {
    patientRequestModel.findOneAndUpdate({_id: request.params.ID}, {$set:{isAccepted:true}})
    .then((request) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(request);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((request,response) => {
    patientRequestModel.findOneAndRemove({_id: request.params.ID})
    .then((request) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(request);
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = patientRequestRouter;