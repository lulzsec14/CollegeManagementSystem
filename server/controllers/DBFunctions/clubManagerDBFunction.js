const ClubManagers = require('../../models/ClubManagers');
const textToHash = require('../../utilities/textToHashed')
const comparePasswords = require("../../utilities/comparePasswords");
const { 
  validateCreateClubManager,
  validateGetClubManagerByRollNo,
  validateGetClubManagerById,
  validateClubManagerLogin,
  validateUpdateClubManagerById,
  validateUpdateClubManagerByRollNo,
  validateDeleteClubManagerById,
  validateDeleteClubManagerByRollNo,
  validateClubManagersByClubIndex,
  validateClubManagerByRollNo







} = require("./../../Validators/ClubManagerValidator")

/////////////////////////////////////////////////////////////

exports.loginClubManager = async (data) => {
  try {
    const validationError = validateClubManagerLogin(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
    const { studentRollNo, password } = data;
    const findClubManager = await ClubManagers.findOne({studentRollNo})
    if(!findClubManager)
    {
        return {
            success: false,
            error: 'Club Manager does not exist!',
            code: 404
          }
    } 
    else {
      if (comparePasswords(password, findClubManager.password)) {
        return {
          success: true,
          code: 200,
          message: "Club Manager logged in successfully!",
          clubManagerData: findClubManager,
        };
      } else {
        return {
          success: false,
          code: 401,
          error: "Not Authorized!",
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};


exports.getClubManagerById = async (data,session) => {
    try {
        const validationError = validateGetClubManagerById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { clubManagerId } = data
        const findClubManager = await ClubManagers.findById( clubManagerId ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManager,
            code: 200, 
            message:"Club Manager found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.getClubManagerByRollNo = async (data,session) => {
    try {
        const validationError = validateGetClubManagerByRollNo(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { studentRollNo } = data
        const findClubManager = await ClubManagers.findOne({studentRollNo}).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManager,
            code: 200, 
            message:"Club Manager found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.getClubManagersByClubIndex = async (data,session) => {
    try {
        const validationError = validateClubManagersByClubIndex(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { clubIndex } = data;
        const findClubManagers = await ClubManagers.find({ clubIndex }).session(session)
        if(!findClubManagers)
        {
            return {
                success: false,
                error: 'There are no Club Managers!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManagers,
            code: 200, 
            message:"Club Managers found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.insertClubManager = async (data,session) => {
    try
    {const validationError = validateCreateClubManager(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { studentRollNo, clubIndex, password, role } = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager of this roll number already exists!',
                code:400
              }
        }
        const hashedPassword = textToHash(password)
        const ClubManager = new ClubManagers({
            studentRollNo, 
            clubIndex, 
            password: hashedPassword, 
            role
        })
        const clubManagerInserted = await ClubManager.save({session})
        return { success:true, clubManagerData:clubManagerInserted, code:201, message:"Club Manager created successfully"}
       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.updateClubManagerByRollNo = async (data,session) => {
    try
    {const validationError = validateUpdateClubManagerByRollNo(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const dataToUpdate = data.dataToUpdate
        const {studentRollNo} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager with this roll number does not exist!',
                code:400
              }
        }
        const clubManagerUpdated = await ClubManagers.findOneAndUpdate({ studentRollNo },dataToUpdate,{new:true}).session(session)
        return {success:true, clubManagerData:clubManagerUpdated, code:200, message:"Club Manager data updated successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }

    }
    
}
exports.updateClubManagerById = async (data,session) => {
    try
    {
      const validationError = validateUpdateClubManagerById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const dataToUpdate = data.dataToUpdate
        const {clubManagerId} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findClubManager = await ClubManagers.findById( clubManagerId ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code:404
              }
        }
        
        const clubManagerUpdated = await ClubManagers.findByIdAndUpdate(clubManagerId,dataToUpdate,{new:true}).session(session)
        return {success:true,clubManagerData:clubManagerUpdated,code:200, message:"Club Manager updated successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }
    
}

exports.deleteClubManagerByRollNo = async (data,session) => {
    try
    {const validationError = validateDeleteClubManagerByRollNo(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { studentRollNo } = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        const clubManagerDeleted = await ClubManagers.findOneAndDelete({studentRollNo}).session(session)
        return {success:true,clubManagerData:clubManagerDeleted,code:200,message:"Club Manager deleted successfully"}       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.deleteClubManagerById = async (data,session) => {
    try
    {
        const validationError = validateDeleteClubManagerById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { clubManagerId } = data
        const findClubManager = await ClubManagers.findById( clubManagerId ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404,
              }
        }
        const clubManagerDeleted = await ClubManagers.findByIdAndDelete(clubManagerId).session(session)
        return {success:true,clubManagerData:clubManagerDeleted,code:200,message:"Club Manager deleted successfully"}       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.deleteClubManagersByClubIndex = async (data,session) => {
    try {const validationError = validateClubManagersByClubIndex(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
      const { clubIndex } = data;
      const clubManagersDeleted = await ClubManagers.deleteMany({ clubIndex }).session(session);
      return { success: true, clubManagerData: clubManagersDeleted, code:200, message:"Club Managers deleted successfully" };
    } 
    catch (error) {
      console.log(error)
      return {
        success: false,
        code:500,
        error:'Server Error'
      };
    }
  };