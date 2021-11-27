// Imports
const mongoose = require('mongoose')
const {
  insertClubManager,
  updateClubManagerById,
  getClubManagerByRollNo,
  getClubManagersByClubIndex,
  deleteClubManagerById
    
  } = require('../DBFunctions/clubManagerDBFunction');
  
const {
  updateClubArrayByIndex,
  deleteFromClubArrayByIndex

} = require('../DBFunctions/clubsDBFunction')

const {
  getStudentByRollNo

} = require('../DBFunctions/studentDBFunction')
  // ------------------------------------
  
  // Adding Club manager
  exports.addClubManager = async (req, res, next) => {
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      const {studentRollNo} = data1
      const op = await getStudentByRollNo({rollNo:studentRollNo})
      if(!op.success) {
        await session.endSession()
        res.status(op.code).json({error:op.error})
        return
      }
      session.startTransaction()
      const op1 = await insertClubManager(data1,session);
      if(!op1.success) {
        await session.abortTransaction()
        await session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const { clubManagerData } = op1
      const { _id, clubIndex } = clubManagerData
      const clubManagers = _id
      const data2 = {clubIndex,dataToUpdate:{clubManagers:clubManagers}}
      const op2 = await updateClubArrayByIndex(data2,session)
      if(!op2.success){
        
        await session.abortTransaction()
        await session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      await session.commitTransaction()
      await session.endSession() 
      const message = op1.message
      const response = {clubManagerData: clubManagerData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      await session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };

// updating club manager 
exports.updateClubManager = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await updateClubManagerById(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const {clubManagerData} = op1
    const message = op1.message
    const response = {clubManagerData: clubManagerData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// get club manager
exports.getClubManager = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await getClubManagerByRollNo(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const {clubManagerData} = op1
    const message = op1.message
    const response = {clubManagerData: clubManagerData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};  


// get all club managers of a club
exports.getAllClubManagersByClubIndex = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await getClubManagersByClubIndex(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const {clubManagerData} = op1
    const message = op1.message
    const response = {clubManagerData: clubManagerData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};  

// delete club manager
exports.deleteClubManager = async (req, res, next) => {
  
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await deleteClubManagerById(data1,session);
    if(!op1.success) {
      await session.abortTransaction()
      await session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    const {clubManagerData } = op1
    const { _id, clubIndex } = clubManagerData
    const clubManagers = _id
    const data2 = {clubIndex,dataToUpdate:{clubManagers:clubManagers}}
    const op2 = await deleteFromClubArrayByIndex(data2,session)
    if(!op2.success){
      
      await session.abortTransaction()
      await session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    await session.endSession() 
    const message = op1.message
    const response = {clubManagerData: clubManagerData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    await session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
};

// ------------------------------------
  