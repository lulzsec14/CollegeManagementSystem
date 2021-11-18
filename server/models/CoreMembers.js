/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema
/// schema
const coreMembersSchema = mongoose.Schema({
    studentRollNo:{
        
        type: Schema.Types.ObjectId,
        required:[true,"Student ID can't be empty"],
    },
    clubID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Clubs',
        required:[true,"Club ID can't be empty"],
    },
    password: {
        type:String,
        required:[true,"Club Manager password can't be empty"],

    },
    role:{
        type:String,
        required:[true,"Role can't be empty"],
        maxlength:[70,"Character length limit exceeded: 70"]
    },
    taskList: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task_List'
    }]


})
const CoreMembers = mongoose.model('CoreMembers', coreMembersSchema)
module.exports = CoreMembers
