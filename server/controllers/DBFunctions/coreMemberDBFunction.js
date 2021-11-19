const CoreMembers = require('../../models/CoreMembers');
const textToHash = require('../../utilities/textToHashed')
exports.getCoreMemberByID = async (data) => {
    try {
        
        const { coreMemberID } = data
        const findCoreMember = await CoreMembers.findById( coreMemberID )
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            coreMemberData: findCoreMember,
            code: 200, 
            message:"Core Member found and data returned"
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
exports.getCoreMemberByRollNo = async (data) => {
    try {
        
        const { studentRollNo } = data
        const findCoreMember = await CoreMembers.findOne({studentRollNo})
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            coreMemberData: findCoreMember,
            code: 200, 
            message:"Core Member found and data returned"
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
exports.getCoreMembersByClubID = async (data) => {
    try {
        
        const { clubID } = data;
        const findCoreMembers = await CoreMembers.find({ clubID })
        if(!findCoreMembers)
        {
            return {
                success: false,
                error: 'There are no Core Members!',
                code: 404
              }
        }
        return {
            success: true,
            coreMemberData: findCoreMembers,
            code: 200, 
            message:"Core Members found and data returned"
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
exports.insertCoreMember = async (data) => {
    try
    {
        const { studentRollNo, clubID, password, role } = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo })
        if(findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member of this roll number already exists!',
                code:400
              }
        }
        const hashedPassword = textToHash(password)
        const coreMember = new CoreMembers({
            studentRollNo, 
            clubID, 
            password: hashedPassword, 
            role
        })
        const coreMemberInserted = await coreMember.save()
        return { success:true, coreMemberData:coreMemberInserted, code:201, message:"Core Member created successfully"}
       
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
exports.updateCoreMemberByRollNo = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="coreMemberID"&&key!=="studentRollNo")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findCoreMember = await CoreMembers.findOne({ studentRollNo })
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member with this roll number does not exist!',
                code:400
              }
        }
        const coreMemberUpdated = await CoreMembers.findOneAndUpdate({ studentRollNo },dataToUpdate,{new:true})
        return {success:true, coreMemberData:coreMemberUpdated, code:200, message:"Core Member data updated successfully"}
       
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
exports.updateCoreMemberByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="coreMemberID"&&key!=="studentRollNo")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {coreMemberID} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findCoreMember = await CoreMembers.findById( coreMemberID )
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code:404
              }
        }
        
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(coreMemberID,dataToUpdate,{new:true})
        return {success:true,coreMemberData:coreMemberUpdated,code:200, message:"Core Member updated successfully"}
       
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

exports.updateCoreMemberArrayByRollNo = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo })
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberUpdated = await CoreMembers.findOneAndUpdate({ studentRollNo },{ $addToSet: dataToUpdate },{new:true})
        return {success:true,coreMemberData:coreMemberUpdated,code:201,message:"Data inserted successfully in Core Member array"}
       
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
exports.updateCoreMemberArrayByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {coreMemberID} = data
        const findCoreMember = await CoreMembers.findById( coreMemberID )
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code:404
              }
        }
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(coreMemberID,{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,coreMemberData:coreMemberUpdated,code:201,message:"Data inserted successfully in Core Member array"}
       
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

exports.deleteFromCoreMemberArrayByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {coreMemberID} = data
        const findCoreMember = await CoreMembers.findById(coreMemberID)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(
            coreMemberID, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          );
        return {success:true,coreMemberData:coreMemberUpdated,code:200,message:"Data deleted successfully from Core Member array"}
       
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
exports.deleteFromCoreMemberArrayByRollNo = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo })
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberUpdated = await CoreMembers.findOneAndUpdate(
            { studentRollNo },
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          );
        return {success:true,coreMemberData:coreMemberUpdated,code:200,message:"Data deleted successfully from Core Member array"}
       
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

exports.deleteCoreMemberByRollNo = async (data) => {
    try
    {
        const { studentRollNo } = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo })
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberDeleted = await CoreMembers.findOneAndDelete({studentRollNo})
        return {success:true,coreMemberData:coreMemberDeleted,code:200,message:"Core Member deleted successfully"}       
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
exports.deleteCoreMemberByID = async (data) => {
    try
    {
        const { coreMemberID } = data
        const findCoreMember = await CoreMembers.findById( coreMemberID )
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404,
              }
        }
        const coreMemberDeleted = await CoreMembers.findByIdAndDelete(CoreMemberID)
        return {success:true,coreMemberData:coreMemberDeleted,code:200,message:"Core Member deleted successfully"}       
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
exports.deleteCoreMembersByClubID = async (data) => {
    try {
      const { clubID } = data;
      const coreMembersDeleted = await CoreMembers.deleteMany({ clubID });
      return { success: true, coreMemberData: coreMembersDeleted, code:200, message:"Core Members deleted successfully" };
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