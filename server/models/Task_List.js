/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema

/// schema
const task_list = mongoose.Schema({
    task_title:{
        type:String,
        required:[true,"Title can't be empty"],
        minlength:[1,"Title can't be empty"],
        maxlength:[40,"Character limit exceeded: 40"]
    },
    task_description:{
        type:String,
        required:[true,"Please enter task description"],
        minlength:[1,"Task can't be empty"],
        maxlength:[700,"Character limit exceeded: 700"]
    },
    task_status:{
        type:String,
        required:[true,"Please enter task status"],
        validate: {
            validator: (value) => {
                value==="Completed"||value==="Assigned"
            },
            message:"Please enter a valid status"
          }
    },
    assigned_by: { 
        type: Schema.Types.ObjectId, 
        ref: 'Students',
        required:[true,"Please enter student ID which assigned the task"]
    },
    
    assigned_to: { 
        type: Schema.Types.ObjectId, 
        ref: 'Students',
        required:[true,"Please enter student ID to which task is assigned"]
    },
    club_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Clubs',
        required:[true,"Please enter club ID"]
    }


})
const Task_List = mongoose.model('Task_List', task_list)
module.exports = Task_List