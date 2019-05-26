const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);
const Users = mongoose.model('User' , UserSchema);
module.exports = Users;