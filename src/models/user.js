const mongoose = require("mongoose");

const createSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true,
    },
    zipcode : {
        type : Number,
        required : true,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

const User = mongoose.model('User' , createSchema);

module.exports = User;