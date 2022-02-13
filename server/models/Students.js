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
      /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@chitkarauniversity.edu.in/,
      'Please provide a valid email',
    ],
    minLength: 8,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
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
      // populate: true,
    },
  ],
  clubsRequested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Requests',
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
  emailToken: {
    type: String,
  },
  emailTokenExpire: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
// ------------------------------------

// Exports
const Students = mongoose.model('Students', studentSchema);
module.exports = Students;
// ------------------------------------
