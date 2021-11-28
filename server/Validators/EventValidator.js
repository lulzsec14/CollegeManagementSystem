const joi = require("joi");

//exporting this function for validation call
module.exports = (data) => {
  const schema = joi.object({
    clubId: joi.string(),
    isPrivate: joi.boolean(),
    eventName: joi.string(),
    eventDescription: joi.string().min(200),
    posterURL: joi.string(),
    registered: joi.array().items(
      joi.object({
        name: joi.string(),
        email: joi.string().required(),
        rollNo: joi.string(),
        studentId: joi.string(),
      })
    ),
    eventTime: joi.string().required(),
    eventDate: joi.string().required(),
    eventVenue: joi.string().required(),
    deadlineTime: joi.string().required(),
    attended: joi.array().items(
      joi.object({
        studentId: joi.string(),
        rollNo: joi.string(),
        ispresent: joi.boolean().required(),
      })
    ),
    position: joi.array().items(
      joi.object({
        first: joi.string(),
        second: joi.string(),
        third: joi.string(),
      })
    ),
  });

  //calling validate on the above schema and the given "data"
  const { error } = schema.validate(data);

  //return error to the respective controller
  return error;
};

/*************************************************************/
