const joi = require("joi");

//exporting this function for validation call
module.exports = (data) => {
  const schema = joi.object({
    studentId: joi.string().required(),
    role: joi.string().required(),
  });

  //calling validate on the above schema and the given "data"
  const { error } = schema.validate(data);

  //return error to the respective controller
  return error;
};

/*************************************************************/
