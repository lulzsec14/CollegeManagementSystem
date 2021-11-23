// Imports
const joi = require('joi');
// ------------------------------------

// Validator function
module.exports = (data) => {
  const schema = joi.object({
    email: joi.string().required().email().lowercase(),
    name: joi.string(),
    password: joi.string().required().min(6),
    phoneNo: joi.string().required(),
  });

  const { error } = schema.validate(data);

  return error;
};
// ------------------------------------
