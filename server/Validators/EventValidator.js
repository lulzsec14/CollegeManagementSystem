const joi = require("joi");

//exporting this function for validation call
module.exports = (data) => {
  const schema = joi.object({
    eventDescription: joi.string().min(200),
    registered: joi.array().items(
      joi.object({
        name: joi.string().required(),
        email: joi.string().unique().required(),
        strudentId: joi.string().unique(),
      }).required(),
    ),
    eventTime: joi.string().required(),
    eventDate: joi.string().required(),
    eventVenue: joi.string().required(),
    attended: joi.array().items(
      joi.object({
        studentId: joi.string().unique(),
        isPresent: joi.boolean().required(),
        position: joi.string(),
      }).required(),
    ),
  });

  //calling validate on the above schema and the given "data"
  const { error } = schema.validate(data);

  //return error to the respective controller
  return error;
};

/*************************************************************/