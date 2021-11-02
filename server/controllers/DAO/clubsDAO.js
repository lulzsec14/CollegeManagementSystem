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
            if(key!=="clubName")
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

exports.updateClubArray = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubName")
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