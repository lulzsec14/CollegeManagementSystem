const joi = require('joi');

module.exports = (data) => {
  const schema = joi.object({
    adminId: joi.string().required().min(4),
    email: joi.string().required().email(),
    name: joi.string(),
    password: joi.string().required().min(6),
    phoneNo: joi.string().required(),
  });

  const {error} = schema.validate(data);

  return error;
};
