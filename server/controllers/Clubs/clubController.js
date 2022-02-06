// Imports
const mongoose = require('mongoose');
const {
  insertClub,
  getClubById,
  getClubByIndex,
  getAllClubs,
  updateClubById,
  deleteClubById
  
} = require('../DBFunctions/clubsDBFunction');

const {
  updateFacultyByFacultyEmail
} = require('../DBFunctions/facultyDBFunction');

const {
  filterData,
  filterData2D
} = require('../../utilities/filterData')
// ------------------------------------

// Adding Club
exports.addClub = async (req, res, next) => {
  
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await insertClub(data1,session);
    if(!op1.success) {
      await session.abortTransaction()
      await session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { clubData } = op1
    const { managedBy, _id } = clubData
    const facultyEmail = managedBy
    const clubId = _id.toString()
    const data2 = {facultyEmail,dataToUpdate:{clubId:clubId}}
    const op2 = await updateFacultyByFacultyEmail(data2,session)
    if(!op2.success){
      
      await session.abortTransaction()
      await session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    await session.endSession() 
    const message = op1.message
    const filteredData = filterData(clubData, {
      clubName: 1,
      clubIndex: 1,
      clubDescription: 1,
      clubManagers: 0,
      coreMembers: 0,
      clubMembers:0,
      events:0,
      taskList:0,
      feedback:0,
      certificates:0,
      photoGallery:0,
      ideabox:0,
      requests:0,
      managedBy:0
    })
    const response = {
      clubData: filteredData,
      message: message
    }
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    await session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
};
// updating Club
exports.updateClub = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    if(data1.dataToUpdate.managedBy)
    {
      const op = await getClubById({clubId:data1.clubId})
      const facultyEmail1 = op.clubData.managedBy
      const dataTemp = {facultyEmail:facultyEmail1,dataToUpdate:{clubId:null}}
      const opTemp = await updateFacultyByFacultyEmail(dataTemp,session)
      if(!opTemp.success){
       await session.abortTransaction()
       await session.endSession()
       res.status(opTemp.code).json({error:opTemp.error})
       return

       }


    }
    const op1 = await updateClubById(data1,session);
    if(!op1.success) {
      await session.abortTransaction()
      await session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    if(!data1.dataToUpdate.managedBy)
    {
      await session.commitTransaction()
      await session.endSession() 
      const clubData = op1.clubData
      const message = op1.message
      const response = {clubData: clubData, message: message}
      res.status(op1.code).json({data:response})
      return
      
    }
    const { clubData } = op1
    const { managedBy, _id } = clubData
    const facultyEmail = managedBy
    const clubId1 = _id.toString()
    const data2 = {facultyEmail,dataToUpdate:{clubId:clubId1}}
    const op2 = await updateFacultyByFacultyEmail(data2,session)
    if(!op2.success){
      
      await session.abortTransaction()
      await session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    await session.endSession() 
    const message = op1.message
    const filteredData = filterData(clubData, {
      clubName: 1,
      clubIndex: 1,
      clubDescription: 1,
      clubManagers: 0,
      coreMembers: 0,
      clubMembers:0,
      events:0,
      taskList:0,
      feedback:0,
      certificates:0,
      photoGallery:0,
      ideabox:0,
      requests:0,
      managedBy:0
    })
    const response = {
      clubData: filteredData,
      message: message
    }
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    await session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
  
  
};
// reading one club
exports.getClub = async (req, res, next) => {
  try {
    const data = req.query;
    const op1 = await getClubByIndex(data);
    if(!op1.success){
      res.status(op1.code).json({error:op1.error})
      return
    }
    const clubData = op1.clubData
    const message = op1.message
    const filteredData = filterData(clubData, {
      clubName: 1,
      clubIndex: 1,
      clubDescription: 1,
      clubManagers: 0,
      coreMembers: 0,
      clubMembers:0,
      events:0,
      taskList:0,
      feedback:0,
      certificates:0,
      photoGallery:0,
      ideabox:0,
      requests:0,
      managedBy:0
    })
    const response = {
      clubData: filteredData,
      message: message
    }
    res.status(op1.code).json({data:response})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// reading all clubs
exports.getAllClubs = async (req, res, next) => {
  try {
    const op1 = await getAllClubs();
    if(!op1.success){
      res.status(op1.code).json({error:op1.error})
      return
    }
    const clubData = op1.clubData
    const message = op1.message
    const filteredData = filterData2D(clubData, {
      clubName: 1,
      clubIndex: 1,
      clubDescription: 1,
      clubManagers: 0,
      coreMembers: 0,
      clubMembers:0,
      events:0,
      taskList:0,
      feedback:0,
      certificates:0,
      photoGallery:0,
      ideabox:0,
      requests:0,
      managedBy:0
    })
    const response = {
      clubData: filteredData,
      message: message
    }
    res.status(op1.code).json({data:response})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// delete one clubs
exports.deleteClub = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await deleteClubById(data);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// ------------------------------------