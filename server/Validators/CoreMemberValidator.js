// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
// ------------------------------------

// create validator function
exports.validateCreateCoreMember = (data) => {
  const schema = joi.object({
    studentRollNo: joi.string().required().trim(),
    clubIndex: joi.string().required().trim(),
    password: joi.string().required().min(8).trim(),
    role: joi.string().required().max(70).trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// getByRollNo validator function
exports.validateGetCoreMemberByRollNoAndClubIndex = (data) => {
    const schema = joi.object({
      studentRollNo: joi.string().required().trim(),
      clubIndex: joi.string().required().trim(),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // getById validator function
exports.validateGetCoreMemberById = (data) => {
    const schema = joi.object({
      coreMemberId: joi.objectId().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  // login validator function
  exports.validateCoreMemberLogin = (data) => {
    const schema = joi.object({
      studentRollNo: joi.string().required().trim(),
      clubIndex: joi.string().required().trim(),
      password:joi.string().required()
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------
  
// UpdateById Validator function
exports.validateUpdateCoreMemberById = (data) => {
  console.log(data)
  const schema = joi.object({
    coreMemberId: joi.objectId().required(),
    dataToUpdate: joi
      .object({    
        password: joi.string().min(8).trim(),
        role:joi.string().max(70).trim()  
      })
      .or('password', 'role'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------


// UpdateByRollNo Validator function
exports.validateUpdateCoreMemberByRollNoAndClubIndex = (data) => {
    const schema = joi.object({
     studentRollNo : joi.string().required().trim(),
     clubIndex: joi.string().required().trim(),
      dataToUpdate: joi
        .object({      
            password: joi.string().min(8).trim(),
            role:joi.string().max(70).trim()  
          })
          .or('password', 'role'),
     });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------


// UpdateById Validator function 
exports.validateUpdateCoreMemberArrayById = (data) => {
  
  const schema = joi.object({
    coreMemberId:joi.objectId().required(),
    dataToUpdate: joi
       .object({
        taskList: joi.objectId().required()
      })})
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  
// UpdateByRollNoAndClubIndex Validator function
exports.validateUpdateCoreMemberArrayByRollNoAndClubIndex = (data) => {
  
    const schema = joi.object({
      studentRollNo: joi.string().required().trim(),
      clubIndex: joi.string().required(),
      dataToUpdate: joi
        .object({
            taskList: joi.objectId().required(),
        })
        
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  
// Delete Validator function
exports.validateDeleteCoreMember = (data) => {
  const schema = joi.object({
    coreMemberId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------
// clud id Validator function
exports.validateCoreMembersByClubIndex = (data) => {
  const schema = joi.object({
    clubIndex: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// roll no Validator function
exports.validateCoreMemberByRollNo = (data) => {
  const schema = joi.object({
    studentRollNo: joi.string().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------