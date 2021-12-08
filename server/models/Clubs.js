/// imports
const mongoose = require('mongoose')
, Schema = mongoose.Schema

/// schema
const clubsSchema = mongoose.Schema({
    clubIndex:{
        type:String,
        unique:true,
        index:true,
        required:[true,"Club index can't be empty"],
        minlength:[1,"Club index can't be empty"],
        maxlength:[25,"Character length limit exceeded: 25"]

    },
    clubName:{
        type:String,
        required:[true,"Club name can't be empty"],
        minlength:[1,"Club name can't be empty"],
        maxlength:[60,"Character length limit exceeded: 60"]
    },
    clubDescription:{
        type:String,
        minlength:[1,"Club desciption can't be empty"],
        maxlength:[3500,"Character limit exceeded: 3000"]
    },
    clubManagers:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'ClubManagers'
    }],
    coreMembers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'CoreMembers'
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
    photoGallery:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'PhotoGallery'
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
        type: String, // faculty email
        required:[true,"Please insert faculty email"],
        default:"",
    }


})
const Clubs = mongoose.model('Clubs', clubsSchema)
module.exports = Clubs