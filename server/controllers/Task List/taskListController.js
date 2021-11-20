const { getTask,getTasksByClubID,insertTask,updateTask,deleteTask,deleteTaskByClubID } = require('../DBFunctions/taskListDBFunction')
const {updateClubArrayByID} = require('../DBFunctions/clubsDBFunction')
const mongoose = require('mongoose')
exports.addTask = async (req, res, next) => {
    try{
    const session = await mongoose.startSession()
    try {
        
            const data = req.body.data
            session.startTransaction()
            /*const result = await insertTask(data,session)
            console.log(result)
            const { _id,clubID } = result.taskData
            const taskList = _id
            const dataToAddInClub = {taskList,clubID}
            const addToClub = await updateClubArrayByID(dataToAddInClub,session)*/
            const addToClub = await getTasksByClubID(data)
            await session.commitTransaction()
            session.endSession()
            res.status(201).json(addToClub)


        }
        catch(error)
        {
            console.log("Rollback")
            await session.abortTransaction()
            session.endSession()
            res.status(500).json(error)

        }

    }
    catch(error)
    {
        console.error(error)
    }
}

    
