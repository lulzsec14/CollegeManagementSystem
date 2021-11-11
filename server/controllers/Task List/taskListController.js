const { getTask,getTaskByClubID,insertTask,updateTask,deleteTask,deleteTaskByClubID } = require('../DBFunctions/taskListDBFunction')
const {updateClubArrayByID} = require('../DBFunctions/clubsDBFunction')
const conn = require('../../config/dbSession')
exports.addTask = async (req, res, next) => {
    try{
    const session = await conn.startSession()
    try {
        
            const data = req.body.data
            session.startTransaction()
            const result = await insertTask(data,session)
            const { _id,clubID } = result.taskData
            const taskList = _id
            const dataToAddInClub = {taskList,clubID}
            const addToClub = await updateClubArrayByID(dataToAddInClub,session)
            console.log(addToClub)
            await session.commitTransaction()
            session.endSession()
            res.status(201).json(addToClub)


        }
        catch(error)
        {
            await session.abortTransaction()
            session.endSession()
            res.status(500).json("Error")

        }

    }
    catch(error)
    {
        console.error(error)
    }
}

    
