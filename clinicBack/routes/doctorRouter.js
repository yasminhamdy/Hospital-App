
const express = require('express');
const doctorRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');

const passport = require('passport');

const Doctors = require('../models/doctor');
const User = require('../models/user');
const authenticate = require('../authenticate');

doctorRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//find all doctors
.get(cors.cors , (request , response , next) => {
    Doctors.find({})
    .populate('data')
        .then((doctors) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(doctors);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//add new doctor from (registeration or admin)
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
      console.log(user);
        let doctor = new Doctors({
            firstname:request.body.firstname,
            lastname: request.body.lastname,
            email:request.body.email,
            speciality: request.body.speciality,
            availableDays: request.body.availableDays,
            startHour:request.body.startHour,
            endHour: request.body.endHour,
            data: user._id
        }); 
        doctor.save((error)=>{
            if(!error)
            {
                response.json(doctor);        
            }
            else
            {
                console.log(error.message);
            }

    });     
    }
  })
    
});

doctorRouter.route('/:id')
//get particular doctor
.get(cors.cors , (request , response , next) => {
    const id = request.params.id;
    Doctors.findOne({_id : id})
        .then((doctor) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(doctor);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//edit particular doctor
.put(cors.corsWithOptions , authenticate.verifyUser, (request , response , next) => {
    const id = request.params.id;
    Doctors.findOneAndUpdate({_id:id} , {$set: request.body}, {new: true})
        .then((doctor) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(doctor);
        }, (err) => next(err))
        .catch((err) => next(err))
})
//delete particular doctor
.delete(cors.corsWithOptions ,authenticate.verifyUser,  (request , response , next) => {
    const id = request.params.id;
    Doctors.findOneAndRemove({_id:id})
        .then((doctor) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(doctor);
        }, (err) => next(err))
        .catch((err) => next(err))
})

// doctorRouter.route('/:id/requests')
// .get(cors.cors , (request , response) => {
//     Doctors.findById(request.params.id)
//     .then((doctor) => {
//         if (doctor != null) {
//             response.statusCode = 200;
//             response.setHeader('Content-Type', 'application/json');
//             response.json(doctor.requests);
//         }
//         else {
//             err = new Error('Doctor ' + request.params.id + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post(cors.corsWithOptions , (request , response) => {
//     Doctors.findById(request.params.id)
//     .then((doctor) => {
//         if (doctor != null) {
//             doctor.requests.push(request.body);
//             doctor.save()
//             .then((doctor) => {
//                 response.statusCode = 200;
//                 response.setHeader('Content-Type', 'application/json');
//                 response.json(doctor);                
//             }, (err) => next(err));
//         }
//         else {
//             err = new Error('Dish ' + request.params.id + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

module.exports = doctorRouter;