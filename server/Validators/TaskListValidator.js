// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
// ------------------------------------

// insert validator function
exports.validateCreateTask = (data) => {
  
  const schema = joi.object({
    taskTitle: joi.string().required().min(1).max(40).trim(),
    taskDescription: joi.string().required().min(1).max(700).trim(),
    taskStatus: joi.string().required().trim(),
    assignedTo: joi.objectId().required(),
    clubId:joi.objectId().required()
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------
// GetBytaskId Validator function
exports.validateGetTaskById = (data) => {
    const schema = joi.object({
      taskId: joi.objectId().required(),
    });
    const { error } = schema.validate(data);
    return error;
  };
  
// GetByclubId Validator function
  exports.validateTasksByClubId = (data) => {
    const schema = joi.object({
      clubId: joi.objectId().required(),
    });
    const { error } = schema.validate(data);
    return error;
}
  // --------------------------------------- 
 // GetBycoreMemberId Validator function
 exports.validateTasksByCoreMemberId = (data) => {
    const schema = joi.object({
      coreMemberId: joi.objectId().required(),
    });
    const { error } = schema.validate(data);
    return error;
}
  // --------------------------------------- 
  
// Update Validator function 
exports.validateUpdateTask = (data) => {
  const schema = joi.object({
    taskId: joi.objectId().required(),
    dataToUpdate: joi
      .object({
        taskTitle: joi.string().min(1).max(40).trim(),
        taskDescription: joi.string().min(1).max(700).trim(),
        taskStatus: joi.string().trim(),
        
      })
      .or('taskTitle', 'taskDescription','taskStatus'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------


// Delete ValidatorById function
exports.validateDeleteTaskById = (data) => {
  const schema = joi.object({
    taskId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
};

// ------------------------------------

