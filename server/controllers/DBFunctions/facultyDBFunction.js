const Faculty = require('../../models/Faculty')
const textToHash = require('../../utilities/textToHashed')
exports.getFaculty = async (data) => {
    try {
        
        const { email } = data
        const findFaculty = await Faculty.findOne({ email })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        return {
            success: true,
            FacultyData: findFaculty,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
    }

}
exports.getFacultyByID = async (data) => {
    try {
        
        const { facultyID } = data
        const findFaculty = await Faculty.findById(facultyID)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
    }

}
exports.getAllFaculty = async () => {
    try {
        
        const findFaculty = await Faculty.find({ })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'There are no Faculty!',
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
    }

}
exports.getFacultyByClubID = async (data) => {
    try {
        
        const { clubID } = data
        const findFaculty = await Faculty.findOne({clubID})
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'No faculty found!',
              }
        }
        return {
            success: true,
            taskData: findFaculty,
          }

    }
    catch (error) {
        return {
            success:false,
            error
        }
    }

}
exports.insertFaculty = async (data) => {
    try
    {
        const { facultyName, email, password, phone, clubID } = data
        const findFaculty = await Faculty.findOne({ email })
        if(findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with same already exists!',
              }
        }
        
        const hashedPassword = textToHash(password)
        const faculty = new Faculty({
            facultyName, 
            email, 
            password: hashedPassword, 
            phone, 
            clubID
            
        })
        const facultyInserted = await faculty.save()
        return {success:true,facultyData:facultyInserted}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}
exports.updateFaculty = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="email")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {email} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findFaculty = await Faculty.findOne({ email })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        if(dataToUpdate.facultyEmailNew)
        {
            dataToUpdate.email=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findOneAndUpdate({ email },dataToUpdate,{new:true})
        return {success:true,facultyData:facultyUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }

    }
    
}
exports.updateFacultyByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="email")
            {
                dataToUpdate[key] = data[key]
            }
        }
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const {facultyID} = data
        const findFaculty = await Faculty.findById( facultyID )
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        if(dataToUpdate.facultyEmailNew)
        {
            dataToUpdate.email=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findByIdAndUpdate(facultyID,dataToUpdate,{new:true})
        return {success:true,facultyData:facultyUpdated}
       
    }
    catch (error) {
        return {
            success: false,
            error
          }

    }
    
}


exports.deleteFaculty = async (data) => {
    try
    {
        const { email } = data
        const findFaculty = await Faculty.findOne({ email })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        const facultyDeleted = await Faculty.findOneAndDelete({email})
        return {success:true,facultyData:facultyDeleted}       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}

exports.deleteFacultyByID = async (data) => {
    try
    {
        const { facultyID } = data
        const findFaculty = await Faculty.findById( facultyID )
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
              }
        }
        const facultyDeleted = await Faculty.findByIdAndDelete(facultyID)
        return {success:true,facultyData:facultyDeleted}       
    }
    catch (error) {
        return {
            success: false,
            error
          }
    }
    
}