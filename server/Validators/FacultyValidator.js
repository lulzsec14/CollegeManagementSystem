// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
// ------------------------------------

// create validator function
exports.validateCreateFaculty = (data) => {
  const schema = joi.object({
    facultyEmail: joi.string().email().required().trim(),
    facultyName: joi.string().required().min(1).max(50).trim(),
    password: joi.string().required().min(8).trim(),
    phone: joi.string().required().length(10).trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// getByEmail validator function
exports.validateGetFacultyByEmail = (data) => {
    const schema = joi.object({
      facultyEmail: joi.string().email().required().trim()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // getById validator function
exports.validateGetFacultyById = (data) => {
    const schema = joi.object({
      facultyId: joi.objectId().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // login validator function
  exports.validateFacultyLogin = (data) => {
    const schema = joi.object({
      facultyEmail: joi.string().email().required().trim(),
      password:joi.string().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------
  
// UpdateById Validator function
exports.validateUpdateFacultyById = (data) => {
  const schema = joi.object({
    facultyId: joi.objectId().required(),
    dataToUpdate: joi
      .object({    
        facultyEmailNew: joi.string().email().trim(),
        facultyName: joi.string().min(1).max(50).trim(),
        password: joi.string().min(8).trim(),
        phone: joi.string().length(10).trim(),
        cludId:joi.string().allow(null)  
      })
      .or('facultyEmailNew', 'facultyName', 'password','phone','cludId'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------


// UpdateByEmail Validator function
exports.validateUpdateFacultyByEmail = (data) => {
    const schema = joi.object({
      facultyEmail: joi.string().email().required().trim(),
      dataToUpdate: joi
        .object({    
          facultyEmailNew: joi.string().email().trim(),
          facultyName: joi.string().min(1).max(50).trim(),
          password: joi.string().min(8).trim(),
          phone: joi.string().length(10).trim(),
          cludId:joi.string().allow(null)  
        })
        .or('facultyEmailNew', 'facultyName', 'password','phone','cludId'),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

// DeleteByID Validator function
exports.validateDeleteFacultyById = (data) => {
  const schema = joi.object({
    facultyId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// DeleteByEmail Validator function
exports.validateDeleteFacultyByEmail = (data) => {
  const schema = joi.object({
    facultyEmail: joi.string().email().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------