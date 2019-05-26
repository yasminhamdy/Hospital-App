
const express = require('express');
const patientRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('./cors');

const Patients = require('../models/patient');
const User = require('../models/user');
const authenticate = require('../authenticate');

patientRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//find all patients
.get(cors.cors ,(request , response , next) => {
    Patients.find({})
        .then((patients) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(patients);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//add new patient from (registeration or admin)
.post(cors.corsWithOptions , (request , response , next) => {
    User.register(new User({username: request.body.username}), 
    request.body.password, (err, user) => {
    if(err) {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'application/json');
      response.json({err: err});
    }
    else {
      passport.authenticate('local')(request, response, () => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json({success: true, status: 'Registration Successful!'});
      });
      let patient = new Patients({
        firstname:request.body.firstname,
        lastname: request.body.lastname,
        age:request.body.age,
        email: request.body.email,
        telNumber: request.body.telNumber
    });

    patient.save((error)=>{
        if(!error)
        {
            response.json(patient);        
        }
        else
        {
            console.log(error.message);
        }
    });

    }
  });
});

patientRouter.route('/:id')
//get particular patient
.get(cors.cors , (request , response , next) => {
    const id = request.params.id;
    Patients.findOne({_id : id})
        .then((patient) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(patient);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//edit particular patient
.put(cors.corsWithOptions ,authenticate.verifyUser, (request , response , next) => {
    const id = request.params.id;
    Patients.findOneAndUpdate({_id:id} , {$set: request.body}, {new: true})
        .then((patient) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(patient);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//delete particular patient
.delete(cors.corsWithOptions , authenticate.verifyUser, (request , response , next) => {
    const id = request.params.id;
    Patients.findOneAndRemove({_id:id})
        .then((patient) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(patient);
        }, (err) => next(err))
        .catch((err) => next(err))
})


module.exports = patientRouter;