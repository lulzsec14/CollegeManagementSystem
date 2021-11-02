const { getTask,getTaskByClubID,insertTask,updateTask,deleteTask } = require('../DAO/taskListDAO')
const { getClubByID } = require('../DAO/clubsDAO')
exports.addTask = async (req, res, next) => {
    try {
        
        var data = req.body.data
        const result = await insertTask(data)
        //const result = await getTask(data)
        
        const ans=await getClubByID({clubID:result.taskData.clubID})
        res.status(201).json(ans)

    }
    catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Server Error' });
    }
}