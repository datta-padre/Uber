const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "first name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be at least 3 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email must be at least 5 characters long"]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity must be at least 1"],
            max: [10, "capacity must be at most 10"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"]
        },
        location: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    }

});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model("captain", captainSchema);