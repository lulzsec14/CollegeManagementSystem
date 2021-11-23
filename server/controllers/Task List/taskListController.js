//imports
const { 
    insertTask,
    updateTask,
    getTask,
    getTasksByClubID,
    getTasksByCoreMemberID,
    deleteTask

 } = require('../DBFunctions/taskListDBFunction')
const {
    updateClubArrayByID,
    deleteFromClubArrayByID

} = require('../DBFunctions/clubsDBFunction')
const {
    updateCoreMemberArrayByID,
    deleteFromCoreMemberArrayByID

} = require('../DBFunctions/coreManagerDBFunction')
const mongoose = require('mongoose')


// adding task
exports.addTask = async (req, res, next) => {
  
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      session.startTransaction()
      const op1 = await insertTask(data1,session);
      if(!op1.success) {
        session.abortTransaction()
        session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const { taskData } = op1
      const { _id, assignedTo, clubID } = taskData
      const coreMemberID = assignedTo
      const taskList = _id
      const data2 = {coreMemberID,taskList}
      const op2 = await updateCoreMemberArrayByID(data2,session)
      if(!op2.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      const data3 = {clubID,taskList}
      const op3 = await updateClubArrayByID(data3,session)
      if(!op3.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op3.code).json({error:op3.error})
        return
  
      }
      await session.commitTransaction()
      session.endSession() 
      const message = op1.message
      const response = {taskData: taskData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      session.endSession()
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
      const data1 = req.body.data;
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
exports.getAllTasksOfClub = async (req, res, next) => {
  
    try {
      const data1 = req.body.data;
      const op1 = await getTasksByClubID(data1);
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
exports.getAllTasksOfCoreMember = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await getTasksByCoreMemberID(data1);
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
        session.abortTransaction()
        session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const {taskData } = op1
      const { _id,assignedTo, clubID } = taskData
      const coreMemberID = assignedTo
      const taskList = _id
      const data2 = {coreMemberID,taskList}
      const op2 = await deleteFromCoreMemberArrayByID(data2,session)
      if(!op2.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      const data3 = {clubID,taskList}
      const op3 = await deleteFromClubArrayByID(data3,session)
      if(!op3.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op3.code).json({error:op3.error})
        return
  
      }
      await session.commitTransaction()
      session.endSession() 
      const message = op1.message
      const response = {taskData: taskData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };


