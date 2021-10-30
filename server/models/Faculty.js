/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema
import validator from 'validator'
/// schema
const faculty_schema = mongoose.Schema({
    faculty_name:{
        type:String,
        required:[true,"Name can't be empty"],
        minlength:[1,"Name can't be empty"],
        maxlength:[40,"Character limit exceeded: 40"]

    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        index:true,
        validate: {
            validator: (value) => {
              return validator.isEmail(value)
            },
            message:"Please enter a valid email"
          }
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter phone number"],
        validate: {
            validator: (value) => {
              return validator.isMobilePhone(value)
            },
            message:"Please enter a valid phone number"
          }
    },
    club_managed: { 
        type: Schema.Types.ObjectId, 
        ref: 'Clubs',
        unique:true,
        required:[true,"Please enter club ID"]
    }


})
const Faculty = mongoose.model('Faculty', faculty_schema)
module.exports = Faculty
