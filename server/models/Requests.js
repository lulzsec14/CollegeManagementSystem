// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const requestSchema = mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Please provide studentId'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: [true, 'Please provide a studentId'],
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubs',
    unique: true,
    required: [true, 'Please provide clubId'],
  },
});
// ------------------------------------

// Exports
const Requests = mongoose.model('Requests', requestSchema);
module.exports = Requests;
// ------------------------------------
