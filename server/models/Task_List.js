/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema

/// schema
const taskListSchema = mongoose.Schema({
    taskTitle:{
        type:String,
        required:[true,"Title can't be empty"],
        minlength:[1,"Title can't be empty"],
        maxlength:[40,"Character limit exceeded: 40"]
    },
    taskDescription:{
        type:String,
        required:[true,"Please enter task description"],
        minlength:[1,"Task can't be empty"],
        maxlength:[700,"Character limit exceeded: 700"]
    },
    taskStatus:{
        type:String,
        required:[true,"Please enter task status"],
        validate: {
            validator: (value) => {
                value==="Completed"||value==="Assigned"
            },
            message:"Please enter a valid status"
          }
    },
    assignedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Students',
        required:[true,"Please enter student ID which assigned the task"]
    },
    
    assignedTo: { 
        type: Schema.Types.ObjectId, 
        ref: 'Students',
        required:[true,"Please enter student ID to which task is assigned"]
    },
    clubID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Clubs',
        required:[true,"Please enter club ID"]
    }


})
const Task_List = mongoose.model('Task_List', taskListSchema)
module.exports = Task_List