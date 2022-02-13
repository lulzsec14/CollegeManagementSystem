/// imports
const validator = require('validator');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/// schema
const facultySchema = mongoose.Schema({
  facultyName: {
    type: String,
    required: [true, "Name can't be empty"],
    minlength: [1, "Name can't be empty"],
    maxlength: [50, 'Character limit exceeded: 50'],
  },
  facultyEmail: {
    type: String,
    required: [true, 'Please enter faculty email'],
    unique: true,
    index: true,
    match: [
      /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@chitkarauniversity.edu.in/,
      'Please provide your college email id',
    ],
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter phone number'],
    validate: {
      validator: (value) => {
        return value.length === 10;
      },
      message: 'Please enter a valid phone number',
    },
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Clubs',
    default: null,
  },
});
const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;
