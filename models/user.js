const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({//we not add username and password object but mongoose automatically add this field in user schema
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);