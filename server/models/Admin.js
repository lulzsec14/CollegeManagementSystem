// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
<<<<<<< HEAD
const adminSchema = new mongoose.Schema({
=======
const adminSchema = new mongoose.Schema({
>>>>>>> f34dc7825d1117f8fbdabe040e23a6c91feac8f0
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
    minLength: 3,
    maxLength: [20, "Name can not be longer than 20 characters!"],
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

// Exports
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
// ------------------------------------
