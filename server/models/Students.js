// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const studentSchema = mongoose.Schema({
  rollNo: {
    type: String,
    unique: true,
    required: [true, 'Please provide your Roll No'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your college Email Id'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    minLength: 8,
    maxLength: 20,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
    select: false,
  },
  name: {
    type: String,
    minLength: 3,
    maxLength: [20, 'Name can not be longer than 20 characters!'],
    required: [true, 'Please provide the name of the student!'],
  },
  semester: {
    type: Number,
    required: [true, 'Please provide the current semester of the student!'],
    min: 1,
    max: 10,
  },
  phoneNo: {
    type: String,
    required: [true, 'Please provide the phone number of the student!'],
    minLength: 5,
    maxLength: 15,
  },
  clubsJoined: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clubs',
    },
  ],
  clubsRequested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clubs',
      joined: {
        type: Boolean,
        default: false,
      },
    },
  ],
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certificates',
    },
  ],
  eventsParticipated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events',
    },
  ],
  eventsAttended: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events',
    },
  ],
});
// ------------------------------------

// Exports
const Students = mongoose.model('Students', studentSchema);
module.exports = Students;
// ------------------------------------
