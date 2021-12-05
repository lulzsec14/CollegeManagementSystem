// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
// ------------------------------------

// create validator function
exports.validateCreateClubManager = (data) => {
  const schema = joi.object({
    studentRollNo: joi.string().required().trim(),
    clubIndex: joi.string().required().trim(),
    password: joi.string().required().min(8).trim(),
    role: joi.string().required().max(50).trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// getByRollNo validator function
exports.validateGetClubManagerByRollNo = (data) => {
    const schema = joi.object({
      studentRollNo: joi.string().required().trim(),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // getById validator function
exports.validateGetClubManagerById = (data) => {
    const schema = joi.object({
      clubManagerId: joi.objectId().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // login validator function
  exports.validateClubManagerLogin = (data) => {
    const schema = joi.object({
      studentRollNo: joi.string().required().trim(),
      password:joi.string().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------
  
// UpdateById Validator function
exports.validateUpdateClubManagerById = (data) => {
  const schema = joi.object({
    clubManagerId: joi.objectId().required(),
    dataToUpdate: joi
      .object({    
        password: joi.string().min(8).trim(),
        role:joi.string().max(50).trim()  
      })
      .or('password', 'role'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------


// UpdateByRollNo Validator function
exports.validateUpdateClubManagerByRollNo = (data) => {
    const schema = joi.object({
     studentRollNo : joi.string().required().trim(),
      dataToUpdate: joi
        .object({      
            password: joi.string().min(8).trim(),
            role:joi.string().max(50).trim()  
          })
          .or('password', 'role'),
     });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

// Delete Validator function
exports.validateDeleteClubManager = (data) => {
  const schema = joi.object({
    clubManagerId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
};
// clud id Validator function
exports.validateClubManagersByClubIndex = (data) => {
  const schema = joi.object({
    clubIndex: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// roll no Validator function
exports.validateClubManagerByRollNo = (data) => {
  const schema = joi.object({
    studentRollNo: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------