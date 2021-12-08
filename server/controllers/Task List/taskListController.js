//imports
const { 
	insertTask,
	updateTask,
	getTask,
	getTasksByClubId,
	getTasksByCoreMemberId,
	deleteTask

} = require('../DBFunctions/taskListDBFunction')
const {
	updateClubArrayById,
	deleteFromClubArrayById

} = require('../DBFunctions/clubsDBFunction')
const {
	updateCoreMemberArrayById,
	deleteFromCoreMemberArrayById

} = require('../DBFunctions/coreMemberDBFunction')
const mongoose = require('mongoose')


// adding task
exports.addTask = async (req, res, next) => {
  
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      session.startTransaction()
      const op1 = await insertTask(data1,session);
      if(!op1.success) {
        await session.abortTransaction()
        await session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const { taskData } = op1
      const { _id, assignedTo, clubId } = taskData
      const coreMemberId = assignedTo.toString()
      const taskList = _id.toString()
      const data2 = {coreMemberId,dataToUpdate:{taskList:taskList}}
      const op2 = await updateCoreMemberArrayById(data2,session)
      if(!op2.success){
        await session.abortTransaction()
        await session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      const clubId1 = clubId.toString()
      const data3 = {clubId:clubId1,dataToUpdate:{taskList:taskList}}
      const op3 = await updateClubArrayById(data3,session)
      if(!op3.success){
        await session.abortTransaction()
        await session.endSession()
        res.status(op3.code).json({error:op3.error})
        return
  
      }
      await session.commitTransaction()
      await session.endSession() 
      const message = op1.message
      const response = {taskData: taskData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      await session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };
    
// update task
exports.updateTask = async (req, res, next) => {

	try {
		const data1 = req.body.data;
		const op1 = await updateTask(data1);
		if(!op1.success) {
			res.status(op1.code).json({error:op1.error})
			return
		}
		const {taskData} = op1
		const message = op1.message
		const response = {taskData: taskData, message: message}
		res.status(op1.code).json({data:response})
		return

	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};

// get task
exports.getTask = async (req, res, next) => {

	try {
		const data1 = req.query;
		const op1 = await getTask(data1);
		if(!op1.success) {
			res.status(op1.code).json({error:op1.error})
			return
		}
		const {taskData} = op1
		const message = op1.message
		const response = {taskData: taskData, message: message}
		res.status(op1.code).json({data:response})
		return

	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};  
	
// get all tasks of a club
exports.getAllTasksByClubId = async (req, res, next) => {

	try {
		const data1 = req.query;
		const op1 = await getTasksByClubId(data1);
		if(!op1.success) {
			res.status(op1.code).json({error:op1.error})
			return
		}
		const {taskData} = op1
		const message = op1.message
		const response = {taskData: taskData, message: message}
		res.status(op1.code).json({data:response})
		return

	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};  

// get all tasks of a core member
exports.getAllTasksByCoreMemberId = async (req, res, next) => {

try {
	const data1 = req.query;
	const op1 = await getTasksByCoreMemberId(data1);
	if(!op1.success) {
		res.status(op1.code).json({error:op1.error})
		return
	}
	const {taskData} = op1
	const message = op1.message
	const response = {taskData: taskData, message: message}
	res.status(op1.code).json({data:response})
	return

} catch (err) {
	console.log(err);
	res.status(500).json({ error: 'Server Error' });
}
};  

// delete task
exports.deleteTask = async (req, res, next) => {
  
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      session.startTransaction()
      const op1 = await deleteTask(data1,session);
      if(!op1.success) {
        await session.abortTransaction()
        await session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const { taskData } = op1
      const { _id,assignedTo, clubId } = taskData
      const coreMemberId = assignedTo.toString()
      const taskList = _id.toString()
      const data2 = {coreMemberId,dataToUpdate:{taskList:taskList}}
      const op2 = await deleteFromCoreMemberArrayById(data2,session)
      if(!op2.success){
        
        await session.abortTransaction()
        await session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      const clubId1 = clubId.toString()
      const data3 = {clubId:clubId1,dataToUpdate:{taskList:taskList}}
      const op3 = await deleteFromClubArrayById(data3,session)
      if(!op3.success){
        
        await session.abortTransaction()
        await session.endSession()
        res.status(op3.code).json({error:op3.error})
        return
  
      }
      await session.commitTransaction()
      await session.endSession() 
      const message = op1.message
      const response = {taskData: taskData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      await session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };

	