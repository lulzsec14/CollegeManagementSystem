const Clubs = require('../../models/Clubs');
const Faculty = require('../../models/Faculty');
const {
  validateCreateClub,
  validateGetClubByIndex,
  validateGetClubById,
  validateUpdateClubById,
  validateUpdateClubByIndex,
  validateUpdateClubArrayById,
  validateUpdateClubArrayByIndex,
  validateDeleteById,
  validateDeleteByIndex
  
} = require('../../Validators/ClubValidator');


//-----------------------------------------------

exports.getClubByIndex = async (data,session) => {
    try {
        const validationError = validateGetClubByIndex(data);
        if (validationError) {
           const { details } = validationError;
           return { success: false, code: 400, error: details[0].message };
          }
        const { clubIndex } = data
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubData: findClub,
            code: 200, 
            message:"Club found and data returned"
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
exports.getClubById = async (data,session) => {
    try {
        const validationError = validateGetClubById(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const { clubId } = data
        const findClub = await Clubs.findById(clubId).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubData: findClub,
            code: 200, 
            message:"Club found and data returned"
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
exports.getAllClubs = async (session) => {
    try {
        
        const findClubs = await Clubs.find({ }).session(session)
        if(!findClubs)
        {
            return {
                success: false,
                error: 'There are no clubs!',
                code: 404
              }
        }
        return {
            success: true,
            clubData: findClubs,
            code: 200, 
            message:"Clubs found and data returned"
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
exports.insertClub = async (data,session) => {
    try
    {const validationError = validateCreateClub(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const { clubIndex, clubName, clubDescription, managedBy } = data
        const facultyEmail = managedBy
        const findFaculty = await Faculty.findOne({facultyEmail}).session(session)
        if(!findFaculty)
        {
          return {
            success: false,
            error: 'Faculty of this email does not exist!',
            code:400
          }

        }
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(findClub)
        {
            return {
                success: false,
                error: 'Club of this index already exists!',
                code:400
              }
        }
        const club = new Clubs({
            clubIndex,
            clubName,
            clubDescription,
            managedBy
        })
        const clubInserted = await club.save({session})
        return { success:true, clubData:clubInserted, code:201, message:"Club created successfully"}
       
    }
    catch (error) {
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.updateClubByIndex = async (data,session) => {
    try
    {
      const validationError = validateUpdateClubByIndex(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const dataToUpdate = data.dataToUpdate
        if(dataToUpdate.managedBy)
        {
          const facultyEmail = dataToUpdate.managedBy
          const findFaculty = await Faculty.findOne({facultyEmail}).session(session)
          if(!findFaculty)
          {
            return {
              success: false,
              error: 'Faculty of this email does not exist!',
              code:400
            }

          }
        }
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubIndex }, dataToUpdate, {new:true} ).session(session)
        return {success:true,clubData:clubUpdated,code:200, message:"Club updated successfully"}
       
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
exports.updateClubById = async (data,session) => {
    try
    {const validationError = validateUpdateClubById(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const dataToUpdate = data.dataToUpdate
        if(dataToUpdate.managedBy)
        {
          const facultyEmail = dataToUpdate.managedBy
          const findFaculty = await Faculty.findOne({facultyEmail}).session(session)
          if(!findFaculty)
          {
            return {
              success: false,
              error: 'Faculty of this email does not exist!',
              code:400
            }

          }
        }
        const {clubId} = data
        const findClub = await Clubs.findById( clubId ).session(session)
        
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code:404
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubId,dataToUpdate,{new:true}).session(session)
        return {success:true,clubData:clubUpdated,code:200, message:"Club updated successfully"}
       
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

exports.updateClubArrayByIndex = async (data,session) => {
    try
    {const validationError = validateUpdateClubArrayByIndex(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const dataToUpdate = data.dataToUpdate
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubIndex },{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,clubData:clubUpdated,code:201,message:"Data inserted successfully in club array"}
       
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
exports.updateClubArrayById = async (data,session) => {
    try
    {
      const validationError = validateUpdateClubArrayById(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
      const dataToUpdate = data.dataToUpdate
        
        const {clubId} = data
        const findClub = await Clubs.findById( clubId ).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code:404
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubId,{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,clubData:clubUpdated,code:201,message:"Data inserted successfully in club array"}
       
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

exports.deleteFromClubArrayById = async (data,session) => {
    try
    {const validationError = validateUpdateClubArrayById(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
       const dataToUpdate = data.dataToUpdate
        
        const {clubId} = data
        const findClub = await Clubs.findById(clubId).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(
            clubId, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          ).session(session);
        return {success:true,clubData:clubUpdated,code:200,message:"Data deleted successfully from club array"}
       
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
exports.deleteFromClubArrayByIndex = async (data,session) => {
    try
    {const validationError = validateUpdateClubArrayByIndex(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const dataToUpdate = data.dataToUpdate
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate(
            { clubIndex },
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          ).session(session);
        return {success:true,clubData:clubUpdated,code:200,message:"Data deleted successfully from club array"}
       
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

exports.deleteClubByIndex = async (data,session) => {
    try
    {const validationError = validateDeleteByIndex(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
        const { clubIndex } = data
        const findClub = await Clubs.findOne({ clubIndex }).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubDeleted = await Clubs.findOneAndDelete({clubIndex}).session(session)
        return {success:true,clubData:clubDeleted,code:200,message:"Club deleted successfully"}       
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
exports.deleteClubById = async (data,session) => {
    try
    {
      const validationError = validateDeleteById(data);
      if (validationError) {
        const { details } = validationError;
        return { success: false, code: 400, error: details[0].message };
      }
        const { clubId } = data
        const findClub = await Clubs.findById( clubId ).session(session)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404,
              }
        }
        const clubDeleted = await Clubs.findByIdAndDelete(clubId).session(session)
        return {success:true,clubData:clubDeleted,code:200,message:"Club deleted successfully"}       
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