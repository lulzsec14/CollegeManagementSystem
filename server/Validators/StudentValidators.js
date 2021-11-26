// Imports
const joi = require('joi');
// ------------------------------------

// Register validator function
exports.validateCreateStudent = (data) => {
  const schema = joi.object({
    rollNo: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    name: joi.string().trim(),
    password: joi.string().required().min(6).trim(),
    phoneNo: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------