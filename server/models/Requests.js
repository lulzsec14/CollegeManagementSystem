// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const requestSchema = mongoose.Schema({
  rollNo: {
    type: String,
    unique: true,
    required: [true, 'Please provide studentId'],
  },
  studentId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: [true, 'Please provide a studentId'],
  },
  clubId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: [true, 'Please provide clubId'],
  },
});
// ------------------------------------

// Exports
const Requests = mongoose.model('Requests', requestSchema);
module.exports = Requests;
// ------------------------------------
