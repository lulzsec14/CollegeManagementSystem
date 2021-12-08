const Faculty = require('../../models/Faculty')
const textToHash = require('../../utilities/textToHashed')
const comparePasswords = require("../../utilities/comparePasswords");
const { 
  validateCreateFaculty,
  validateGetFacultyByEmail,
  validateGetFacultyById,
  validateFacultyLogin,
  validateUpdateFacultyById,
  validateUpdateFacultyByEmail,
  validateDeleteFacultyById,
  validateDeleteFacultyByEmail,
  validateFacultyClubId

} = require("../../Validators/FacultyValidator")

////////////////////////////////////////////////////////////////////////////////////////////////


exports.loginFaculty = async (data) => {
    try {

      const validationError = validateFacultyLogin(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
      const { facultyEmail, password } = data;
      const findFaculty = await Faculty.findOne({ facultyEmail });
      if (!findFaculty) {
        return {
          success: false,
          code: 404,
          error: "No Account registered with the mentioned email id!",
        };
      } else {
        if (comparePasswords(password, findFaculty.password)) {
          return {
            success: true,
            code: 200,
            message: "Faculty logged in successfully!",
            facultyData: findFaculty,
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
  

exports.getFacultyByFacultyEmail = async (data,session) => {
    try {
        const validationError = validateGetFacultyByEmail(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { facultyEmail } = data
        const findFaculty = await Faculty.findOne({ facultyEmail }).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this faculty email does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code: 200,
            message: "Faculty found and data returned"
          }

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
exports.getFacultyById = async (data,session) => {
    try {
        const validationError = validateGetFacultyById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { facultyId } = data
        const findFaculty = await Faculty.findById(facultyId).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code:200, 
            message:"Faculty found and data returned"
          }

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
exports.getAllFaculty = async (session) => {
    try {
        
        const findFaculty = await Faculty.find({ }).session(session)
        return {
            success: true,
            facultyData: findFaculty,
            code: 200, 
            message:"All faculty found and data returned"
          }

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
exports.getFacultyByClubId = async (data,session) => {
    try {
        const validationError = validateFacultyClubId(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { clubId } = data
        const findFaculty = await Faculty.findOne({clubId}).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'No faculty found!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code:200,
            message: 'Faculty found and data returned'
          }

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
exports.insertFaculty = async (data,session) => {
    try
    {const validationError = validateCreateFaculty(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { facultyName, facultyEmail, password, phone } = data
        const findFaculty = await Faculty.findOne({ facultyEmail }).session(session)
        if(findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with same facultyEmail already exists!',
                code: 400
              }
        }
        
        const hashedPassword = textToHash(password)
        const faculty = new Faculty({
            facultyName, 
            facultyEmail, 
            password: hashedPassword, 
            phone
            
        })
        const facultyInserted = await faculty.save({session})
        return {success:true, facultyData:facultyInserted, code:201, message:"Faculty created successfully"}
       
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
exports.updateFacultyByFacultyEmail = async (data,session) => {
    try
    {const validationError = validateUpdateFacultyByEmail(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const dataToUpdate = data.dataToUpdate
        
        console.log(dataToUpdate)
        const {facultyEmail} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findFaculty = await Faculty.findOne({ facultyEmail }).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this email does not exist!',
                code:400
              }
        }
        if(findFaculty.clubId!==null&&dataToUpdate.clubId!==null)
        {
          return {
            success: false,
            error: 'Faculty already manages another club!',
            code:400
          }

        }
        if(dataToUpdate.facultyEmailNew)
        {
            const facultyEmailNew = dataToUpdate.facultyEmailNew
            console.log(facultyEmailNew)
            const findFaculty1 = await Faculty.findOne({ facultyEmail:facultyEmailNew }).session(session)
            if(findFaculty1)
            {
                return {
                   success: false,
                   error: 'Faculty with this email already exists!',
                   code:400
                }
            }
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findOneAndUpdate({ facultyEmail },dataToUpdate,{new:true}).session(session)
        return {success:true, facultyData:facultyUpdated, code:200, message:"Faculty data updated successfully"}
       
    }
    catch (error) {
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }

    }
    
}
exports.updateFacultyById = async (data,session) => {
    try
    {const validationError = validateUpdateFacultyById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const dataToUpdate = data.dataToUpdate
        
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
       
        const {facultyId} = data
        const findFaculty = await Faculty.findById( facultyId ).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code:400
              }
        }
        if(dataToUpdate.facultyEmailNew)
        {
            const facultyEmailNew = dataToUpdate.facultyEmailNew
            const findFaculty1 = await Faculty.findOne({ facultyEmail:facultyEmailNew }).session(session)
            if(findFaculty1)
            {
                return {
                   success: false,
                   error: 'Faculty with this email already exists!',
                   code:400
                }
            }
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        
        const facultyUpdated = await Faculty.findByIdAndUpdate(facultyId,dataToUpdate,{new:true}).session(session)
        return {success:true, facultyData:facultyUpdated, code:200, message:"Faculty data updated successfully"}
       
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


exports.deleteFacultyByFacultyEmail = async (data,session) => {
    try
    {const validationError = validateDeleteFacultyByEmail(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { facultyEmail } = data
        const findFaculty = await Faculty.findOne({ facultyEmail }).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this facultyEmail does not exist!',
                code:400
              }
        }
        if(findFaculty.clubId!==null)
        {
            return {
                success: false,
                error: 'Unable to delete this faculty because this faculty manages a club!',
                code: 400
              }

        }
        const facultyDeleted = await Faculty.findOneAndDelete({facultyEmail}).session(session)
        return {success:true, facultyData:facultyDeleted, code:200, message:"Faculty data deleted successfully"}       
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

exports.deleteFacultyById = async (data,session) => {
    try
    {const validationError = validateDeleteFacultyById(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { facultyId } = data
        const findFaculty = await Faculty.findById( facultyId ).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code: 400
              }
        }
        if(findFaculty.clubId!==null)
        {
            return {
                success: false,
                error: 'Unable to delete this faculty because this faculty manages a club!',
                code: 400
              }

        }
        const facultyDeleted = await Faculty.findByIdAndDelete(facultyId).session(session)
        return {success:true, facultyData:facultyDeleted, code:200, message:"Faculty data deleted successfully"}       
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