// Imports
const {
  insertFaculty,
  updateFacultyById,
  deleteFacultyById,
  getFacultyByFacultyEmail,
  getAllFaculty
  
} = require('../DBFunctions/facultyDBFunction');

const {
  updateClubById
} = require('../DBFunctions/clubssDBFunction');
// ------------------------------------

// Adding faculty
exports.addFaculty = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await insertFaculty(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { facultyData } = op1
    const message = op1.message
    const response = {facultyData: facultyData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// get faculty
exports.getFaculty = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await getFacultyByFacultyEmail(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { facultyData } = op1
    const message = op1.message
    const response = {facultyData: facultyData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// get all faculty
exports.getAllFaculty = async (req, res, next) => {
  
  try {
    const op1 = await getAllFaculty();
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { facultyData } = op1
    const message = op1.message
    const response = {facultyData: facultyData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// update faculty
exports.updateFaculty = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await updateFacultyById(data1,session);
    if(!op1.success) {
      session.abortTransaction()
      session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    if(!data1.clubId)
    {
      await session.commitTransaction()
      session.endSession() 
      const facultyData = op1.facultyData
      const message = op1.message
      const response = {facultyData: facultyData, message: message}
      res.status(op1.code).json({data:response})
      return
      
    }
    const { facultyData } = op1
    const { clubId, facultyEmail } = facultyData
    const  managedBy = facultyEmail
    const data2 = {clubId,managedBy}
    const op2 = await updateClubById(data2,session)
    if(!op2.success){
      
      session.abortTransaction()
      session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    session.endSession() 
    const message = op1.message
    const response = {facultyData: facultyData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
  
  
};
// delete faculty
exports.deleteFaculty = async (req, res, next) => {
  try {
    const data1 = req.body.data;
    const op1 = await deleteFacultyById(data1);
    if(!op1.success) {
      res.status(op1.code).json({error:op1.error})
      return
    }
    const { facultyData } = op1
    const message = op1.message
    const response = {facultyData: facultyData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
  
  
};

