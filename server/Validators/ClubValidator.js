// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
// ------------------------------------

// insert validator function
exports.validateCreateClub = (data) => {
  const schema = joi.object({
    clubIndex: joi.string().required().min(1).max(25).trim(),
    clubName: joi.string().required().min(1).max(60).trim(),
    clubDescription: joi.string().required().min(1).max(3500).trim(),
    managedBy: joi.string().email().required().trim(),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------

// GetByIndex Validator function
exports.validateGetClubByIndex = (data) => {
  const schema = joi.object({
    clubIndex: joi.string().required(),
  });
  const { error } = schema.validate(data);
  return error;
};

// GetById Validator function
exports.validateGetClubById = (data) => {
  const schema = joi.object({
    clubId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
}
// --------------------------------------- 
// UpdateById Validator function 
exports.validateUpdateClubById = (data) => {
  const schema = joi.object({
    clubId: joi.objectId().required(),
    dataToUpdate: joi
      .object({
        clubName: joi.string().min(1).max(60).trim(),
        clubDescription: joi.string().min(1).max(3500).trim(),
        managedBy: joi.string().email().trim(),
      })
      .or('clubName', 'clubDescription','managedBy'),
  });
  const { error } = schema.validate(data);
  return error;
};
// ------------------------------------


// UpdateByIndex Validator function
exports.validateUpdateClubByIndex = (data) => {
    const schema = joi.object({
      clubIndex: joi.string().required(),
      dataToUpdate: joi
        .object({
          clubName: joi.string().min(1).max(60).trim(),
          clubDescription: joi.string().min(1).max(3500).trim(),
          managedBy: joi.string().email().trim(),
        })
        .or('clubName', 'clubDescription','managedBy'),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------


// UpdateById Validator function 
exports.validateUpdateClubArrayById = (data) => {
    const schema = joi.object({
      clubId: joi.objectId().required(),
      dataToUpdate: joi
        .object({
            clubManagers: joi.objectId(),
            coreMembers: joi.objectId(),
            clubMembers: joi.objectId(),
            events: joi.objectId(),
            taskList: joi.objectId(),
            feedback: joi.objectId(),
            certificates: joi.objectId(),
            photoGallery: joi.objectId(),
            ideabox: joi.objectId(),
            requests: joi.objectId(),
        })
        .or('clubManagers', 'coreMembers','clubMembers','events',
        'taskList','feedback','certificates','ideabox','requests','photoGallery'
        ),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------

  
// UpdateByIndex Validator function
exports.validateUpdateClubArrayByIndex = (data) => {
    const schema = joi.object({
      clubIndex: joi.string().required(),
      dataToUpdate: joi
        .object({
            clubManagers: joi.objectId(),
            coreMembers: joi.objectId(),
            clubMembers: joi.objectId(),
            events: joi.objectId(),
            taskList: joi.objectId(),
            feedback: joi.objectId(),
            certificates: joi.objectId(),
            photoGallery: joi.objectId(),
            ideabox: joi.objectId(),
            requests: joi.objectId(),
        })
        .or('clubManagers', 'coreMembers','clubMembers','events',
        'taskList','feedback','certificates','ideabox','requests','photoGallery'
        ),
    });
    const { error } = schema.validate(data);
    return error;
  };
  // ------------------------------------


// Delete ValidatorById function
exports.validateDeleteById = (data) => {
  const schema = joi.object({
    clubId: joi.objectId().required(),
  });
  const { error } = schema.validate(data);
  return error;
};

// ------------------------------------

// Delete ValidatorByIndex function
exports.validateDeleteByIndex = (data) => {
    const schema = joi.object({
      clubIndex: joi.string().required(),
    });
    const { error } = schema.validate(data);
    return error;
  };

// --------------------------------------- 