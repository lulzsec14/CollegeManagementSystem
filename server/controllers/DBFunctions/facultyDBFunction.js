const Faculty = require('../../models/Faculty')
const textToHash = require('../../utilities/textToHashed')
exports.getFacultyByFacultyEmail = async (data,session) => {
    try {
        
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
exports.getFacultyByID = async (data,session) => {
    try {
        
        const { facultyID } = data
        const findFaculty = await Faculty.findById(facultyID).session(session)
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
exports.getFacultyByClubID = async (data,session) => {
    try {
        
        const { clubID } = data
        const findFaculty = await Faculty.findOne({clubID}).session(session)
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
    {
        const { facultyName, facultyEmail, password, phone, clubID } = data
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
            phone, 
            clubID
            
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
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="facultyEmail")
            {
                dataToUpdate[key] = data[key]
            }
        }
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
        if(dataToUpdate.facultyEmailNew)
        {
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findOneAndUpdate({ facultyEmail },dataToUpdate,{new:true}).session(session)
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
exports.updateFacultyByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="facultyEmail")
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
        const findFaculty = await Faculty.findById( facultyID ).session(session)
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
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findByIdAndUpdate(facultyID,dataToUpdate,{new:true}).session(session)
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
    {
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
        if(findFaculty.clubID!==null)
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

exports.deleteFacultyByID = async (data,session) => {
    try
    {
        const { facultyID } = data
        const findFaculty = await Faculty.findById( facultyID ).session(session)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code: 400
              }
        }
        if(findFaculty.clubID!==null)
        {
            return {
                success: false,
                error: 'Unable to delete this faculty because this faculty manages a club!',
                code: 400
              }

        }
        const facultyDeleted = await Faculty.findByIdAndDelete(facultyID).session(session)
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