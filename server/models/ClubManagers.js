/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema
/// schema
const clubManagersSchema = mongoose.Schema({
    studentRollNo:{
        type: String,
        required:[true,"Student Roll no can't be empty"],
        unique: true
    },
    clubIndex: { 
        type: String,
        required:[true,"Club Index can't be empty"],
    },
    password: {
        type:String,
        required:[true,"Club Manager password can't be empty"],

    },
    role:{
        type:String,
        required:[true,"Role can't be empty"],
        maxlength:[50,"Character length limit exceeded: 50"]
    }


})
const ClubManagers = mongoose.model('ClubManagers', clubManagersSchema)
module.exports = ClubManagers