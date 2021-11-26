const CoreMembers = require('../../models/CoreMembers');
const textToHash = require('../../utilities/textToHashed')
exports.getCoreMemberById = async (data,session) => {
    try {
        
        const { coreMemberId } = data
        const findCoreMember = await CoreMembers.findById( coreMemberId ).session(session)
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
exports.getCoreMemberByRollNo = async (data,session) => {
    try {
        
        const { studentRollNo } = data
        const findCoreMember = await CoreMembers.findOne({studentRollNo}).session(session)
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
exports.getCoreMembersByClubId = async (data,session) => {
    try {
        
        const { clubId } = data;
        const findCoreMembers = await CoreMembers.find({ clubId }).session(session)
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
exports.insertCoreMember = async (data,session) => {
    try
    {
        const { studentRollNo, clubId, password, role } = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo }).session(session)
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
            clubId, 
            password: hashedPassword, 
            role
        })
        const coreMemberInserted = await coreMember.save({session})
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
exports.updateCoreMemberByRollNo = async (data,session) => {
    try
    {
        const dataToUpdate = data.dataToUpdate
        const {studentRollNo} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findCoreMember = await CoreMembers.findOne({ studentRollNo }).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member with this roll number does not exist!',
                code:400
              }
        }
        const coreMemberUpdated = await CoreMembers.findOneAndUpdate({ studentRollNo },dataToUpdate,{new:true}).session(session)
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
exports.updateCoreMemberById = async (data,session) => {
    try
    {
         const dataToUpdate = data.dataToUpdate
        const {coreMemberId} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findCoreMember = await CoreMembers.findById( coreMemberId ).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code:404
              }
        }
        
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(coreMemberId,dataToUpdate,{new:true}).session(session)
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

exports.updateCoreMemberArrayByRollNo = async (data,session) => {
    try
    {
      const dataToUpdate = data.dataToUpdate
        
        const {studentRollNo} = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo }).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberUpdated = await CoreMembers.findOneAndUpdate({ studentRollNo },{ $addToSet: dataToUpdate },{new:true}).session(session)
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
exports.updateCoreMemberArrayById = async (data,session) => {
    try
    {
      const dataToUpdate = data.dataToUpdate
        
        const {coreMemberId} = data
        const findCoreMember = await CoreMembers.findById( coreMemberId ).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code:404
              }
        }
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(coreMemberId,{ $addToSet: dataToUpdate },{new:true}).session(session)
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

exports.deleteFromCoreMemberArrayById = async (data,session) => {
    try
    {
      const dataToUpdate = data.dataToUpdate
        
        const {coreMemberId} = data
        const findCoreMember = await CoreMembers.findById(coreMemberId).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberUpdated = await CoreMembers.findByIdAndUpdate(
            coreMemberId, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          ).session(session);
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
exports.deleteFromCoreMemberArrayByRollNo = async (data,session) => {
    try
    {
      const dataToUpdate = data.dataToUpdate
        
        const {studentRollNo} = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo }).session(session)
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
          ).session(session);
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

exports.deleteCoreMemberByRollNo = async (data,session) => {
    try
    {
        const { studentRollNo } = data
        const findCoreMember = await CoreMembers.findOne({ studentRollNo }).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404
              }
        }
        const coreMemberDeleted = await CoreMembers.findOneAndDelete({studentRollNo}).session(session)
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
exports.deleteCoreMemberById = async (data,session) => {
    try
    {
        const { coreMemberId } = data
        const findCoreMember = await CoreMembers.findById( coreMemberId ).session(session)
        if(!findCoreMember)
        {
            return {
                success: false,
                error: 'Core Member does not exist!',
                code: 404,
              }
        }
        const coreMemberDeleted = await CoreMembers.findByIdAndDelete(CoreMemberId).session(session)
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
exports.deleteCoreMembersByClubId = async (data,session) => {
    try {
      const { clubId } = data;
      const coreMembersDeleted = await CoreMembers.deleteMany({ clubId }).session(session);
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