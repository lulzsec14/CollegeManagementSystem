const Clubs = require('../../models/Clubs');
exports.getClubByIndex = async (data) => {
    try {
        
        const { clubIndex } = data
        const findClub = await Clubs.findOne({ clubIndex })
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
exports.getClubByID = async (data) => {
    try {
        
        const { clubID } = data
        const findClub = await Clubs.findById(clubID)
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
exports.getAllClubs = async () => {
    try {
        
        const findClubs = await Clubs.find({ })
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
exports.insertClub = async (data) => {
    try
    {
        const { clubIndex, clubName, clubDescription, managedBy } = data
        const findClub = await Clubs.findOne({ clubIndex })
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
        const clubInserted = await club.save()
        return { success:true, clubData:clubInserted, code:201, message:"Club created successfully"}
       
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
exports.updateClubByIndex = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubIndex"&&key!=="clubID")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        if(dataToUpdate.clubIndexNew)
        {
            dataToUpdate.clubIndex=dataToUpdate.clubIndexNew
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubIndex }, dataToUpdate, {new:true} )
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
exports.updateClubByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubID"&&key!=="clubIndex")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubID} = data
        const findClub = await Clubs.findById( clubID )
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code:404
              }
        }
        if(dataToUpdate.clubIndexNew)
        {
            dataToUpdate.clubIndex=dataToUpdate.clubIndexNew
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubID,dataToUpdate,{new:true})
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

exports.updateClubArrayByIndex = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubIndex"&&key!=="clubID"&&key!=="clubName"&&key!=="clubDescription")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubIndex },{ $addToSet: dataToUpdate },{new:true})
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
exports.updateClubArrayByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubIndex"&&key!=="clubID"&&key!=="clubDescription"&&key!=="clubName")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubID} = data
        const findClub = await Clubs.findById( clubID )
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code:404
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubID,{ $addToSet: dataToUpdate },{new:true}).session(session)
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

exports.deleteFromClubArrayByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubIndex"&&key!=="clubID"&&key!=="clubDescription"&&key!=="clubName")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubID} = data
        const findClub = await Clubs.findById(clubID)
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(
            clubID, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          );
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
exports.deleteFromClubArrayByIndex = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubIndex"&&key!=="clubID"&&key!=="clubDescription"&&key!=="clubName")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubIndex} = data
        const findClub = await Clubs.findOne({ clubIndex })
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
          );
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

exports.deleteClubByIndex = async (data) => {
    try
    {
        const { clubIndex } = data
        const findClub = await Clubs.findOne({ clubIndex })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404
              }
        }
        const clubDeleted = await Clubs.findOneAndDelete({clubIndex})
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
exports.deleteClubByID = async (data) => {
    try
    {
        const { clubID } = data
        const findClub = await Clubs.findById( clubID )
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
                code: 404,
              }
        }
        const clubDeleted = await Clubs.findByIdAndDelete(clubID)
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