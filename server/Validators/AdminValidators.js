// Imports
const joi = require('joi');
// ------------------------------------

// Register validator function
exports.validateCreateAdmin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().trim(),
    name: joi.string().trim(),
    password: joi.string().required().min(6).trim(),
    phoneNo: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// Update Validator function
exports.validateUpdateAdmin = (data) => {
  const schema = joi.object({
    email: joi.string().required().email().trim(),
    dataToUpdate: joi
      .object({
        name: joi.string().email().required().trim(),
        phoneNo: joi.string().required().trim(),
      })
      .or('name', 'phoneNo'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// Delete Validator function
exports.validateDeleteAdmin = (data) => {
  const schema = joi.object({
    email: joi.string().required().email().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------
