const Clubs = require('../../models/Clubs');
exports.getClub = async (data) => {
    try {
        
        const { clubName } = data
        const findClub = await Clubs.findOne({ clubName })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        return {
            success: true,
            clubData: findClub,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
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
              }
        }
        return {
            success: true,
            clubData: findClub,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
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
              }
        }
        return {
            success: true,
            clubData: findClubs,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
    }

}
exports.insertClub = async (data) => {
    try
    {
        const { clubName, clubDescription } = data
        const findClub = await Clubs.findOne({ clubName })
        if(findClub)
        {
            return {
                success: false,
                error: 'Club already exists!',
              }
        }
        const club = new Clubs({
            clubName,
            clubDescription
        })
        const clubInserted = await club.save()
        return {success:true,clubData:clubInserted}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}
exports.updateClub = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName"&&key!=="clubID")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubName} = data
        const findClub = await Clubs.findOne({ clubName })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        if(dataToUpdate.clubNameNew)
        {
            dataToUpdate.clubName=dataToUpdate.clubNameNew
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubName },dataToUpdate,{new:true})
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }

    }
    
}
exports.updateClubByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubID"&&key!=="clubName")
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
              }
        }
        if(dataToUpdate.clubNameNew)
        {
            dataToUpdate.clubName=dataToUpdate.clubNameNew
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubID,dataToUpdate,{new:true})
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }

    }
    
}

exports.updateClubArray = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName"&&key!=="clubID"&&key!=="clubDescription")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubName} = data
        const findClub = await Clubs.findOne({ clubName })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate({ clubName },{ $addToSet: dataToUpdate },{new:true})
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}
exports.updateClubArrayByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName"&&key!=="clubID"&&key!=="clubDescription")
            {
                dataToUpdate[key] = data[key]
                throw new Error("error")
            }
        }
        const {clubID} = data
        const findClub = await Clubs.findById( clubID )
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(clubID,{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        throw new Error("error")
    }
    
}

exports.deleteFromClubArrayByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName"&&key!=="clubID"&&key!=="clubDescription")
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
              }
        }
        const clubUpdated = await Clubs.findByIdAndUpdate(
            clubID, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          );
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}
exports.deleteFromClubArray = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName"&&key!=="clubID"&&key!=="clubDescription")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubName} = data
        const findClub = await Clubs.findOne({ clubName })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        const clubUpdated = await Clubs.findOneAndUpdate(
            { clubName },
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          );
        return {success:true,clubData:clubUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}

exports.deleteClub = async (data) => {
    try
    {
        const { clubName } = data
        const findClub = await Clubs.findOne({ clubName })
        if(!findClub)
        {
            return {
                success: false,
                error: 'Club does not exist!',
              }
        }
        const clubDeleted = await Clubs.findOneAndDelete({clubName})
        return {success:true,clubData:clubDeleted}       
    }
    catch (error) {
        return {
            success: false,
            error
          }
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
              }
        }
        const clubDeleted = await Clubs.findByIdAndDelete(clubID)
        return {success:true,clubData:clubDeleted}       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}