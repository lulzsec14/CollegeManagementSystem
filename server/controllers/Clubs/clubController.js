// Imports
const {
  insertClub,
  getClubByIndex,
  getAllClubs,
  updateClubById,
  deleteClubById
  
} = require('../DBFunctions/clubsDBFunction');

const {
  updateFacultyByFacultyEmail
} = require('../DBFunctions/facultyDBFunction');
// ------------------------------------

// Adding Club
exports.addClub = async (req, res, next) => {
  
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await insertClub(data1,session);
    if(!op1.success) {
      session.abortTransaction()
      session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { clubData } = op1
    const { managedBy, clubId } = clubData
    const facultyEmail = managedBy
    const data2 = {facultyEmail,dataToUpdate:{clubId:clubId}}
    const op2 = await updateFacultyByFacultyEmail(data2,session)
    if(!op2.success){
      
      session.abortTransaction()
      session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    session.endSession() 
    const message = op1.message
    const response = {clubData: clubData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
};
// updating Club
exports.updateClub = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await updateClubById(data1,session);
    if(!op1.success) {
      session.abortTransaction()
      session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    if(!data1.managedBy)
    {
      await session.commitTransaction()
      session.endSession() 
      const clubData = op1.clubData
      const message = op1.message
      const response = {clubData: clubData, message: message}
      res.status(op1.code).json({data:response})
      return
      
    }
    const { clubData } = op1
    const { managedBy, clubId } = clubData
    const facultyEmail = managedBy
    const data2 = {facultyEmail,dataToUpdate:{clubId:clubId}}
    const op2 = await updateFacultyByFacultyEmail(data2,session)
    if(!op2.success){
      
      session.abortTransaction()
      session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    session.endSession() 
    const message = op1.message
    const response = {clubData: clubData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
  
  
};
// reading one club
exports.getClub = async (req, res, next) => {
  try {
    const data = req.body.data;
    const op1 = await getClubByIndex(data);
    if(!op.success){
      res.status(op1.code).json({error:op1.error})
      return
    }
    const clubData = op1.clubData
    const message = op1.message
    const response = {clubData: clubData, message: message}
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
    if(!op.success){
      res.status(op1.code).json({error:op1.error})
      return
    }
    const clubData = op1.clubData
    const message = op1.message
    const response = {clubData: clubData, message: message}
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