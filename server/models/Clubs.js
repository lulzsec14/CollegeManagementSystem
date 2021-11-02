/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema

/// schema
const clubsSchema = mongoose.Schema({
    clubName:{
        type:String,
        index:true,
        unique:true,
        required:[true,"Club name can't be empty"],
        minlength:[1,"Club name can't be empty"],
        maxlength:[50,"Character length limit exceeded: 50"]
    },
    clubDescription:{
        type:String,
        minlength:[1,"Club desciption can't be empty"],
        maxlength:[3000,"Character limit exceeded: 3000"]
    },
    coreMembers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Students'
    }],
    clubMembers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Students'
    }],
    events: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Events'
    }],
    taskList: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task_List'
    }],
    feedback: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Feedback'
    }],
    certificates: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Certificates'
    }],
    ideabox: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Ideabox'
    }],    
    requests: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Requests'
    }],
    managedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Faculty'
    }


})
const Clubs = mongoose.model('Clubs', clubsSchema)
module.exports = Clubs