// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const AdminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: [true, 'Please provide Admin Id!'],
  },
  email: {
    type: String,
    require: [true, 'Please provide an email!'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
    select: false,
  },
  phoneNo: {
    type: String,
    required: [true, 'Please provide a phone number!'],
  },
});
// ------------------------------------

module.exports = mongoose.model('AdminSchema', AdminSchema);
