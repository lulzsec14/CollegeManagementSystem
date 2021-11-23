// Imports
const {
  insertClubManager,
  updateClubManagerByID,
  getClubManagerByRollNo,
  getClubManagersByClubID,
  deleteClubManagerByID
    
  } = require('../DBFunctions/clubManagerDBFunction');
  
const {
  updateClubArrayByID,
  deleteFromClubArrayByID

} = require('../DBFunctions/clubsDBFunction')
  // ------------------------------------
  
  // Adding Club manager
  exports.addClubManager = async (req, res, next) => {
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      session.startTransaction()
      const op1 = await insertClubManager(data1,session);
      if(!op1.success) {
        session.abortTransaction()
        session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const { clubManagerData } = op1
      const { _id, clubID } = clubManagerData
      const clubManagers = _id
      const data2 = {clubID,clubManagers}
      const op2 = await updateClubArrayByID(data2,session)
      if(!op2.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      await session.commitTransaction()
      session.endSession() 
      const message = op1.message
      const response = {clubManagerData: clubManagerData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };

// updating club manager 
exports.updateClubManager = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await updateClubManagerByID(data1);
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
exports.getAllClubManagers = async (req, res, next) => {
  
  try {
    const data1 = req.body.data;
    const op1 = await getClubManagersByClubID(data1);
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
    const op1 = await deleteClubManagerByID(data1,session);
    if(!op1.success) {
      session.abortTransaction()
      session.endSession()
      res.status(op1.code).json({error:op1.error})
      return
    }
    const {clubManagerData } = op1
    const { _id, clubID } = clubManagerData
    const clubManagers = _id
    const data2 = {clubID,clubManagers}
    const op2 = await deleteFromClubArrayByID(data2,session)
    if(!op2.success){
      
      session.abortTransaction()
      session.endSession()
      res.status(op2.code).json({error:op2.error})
      return

    }
    await session.commitTransaction()
    session.endSession() 
    const message = op1.message
    const response = {clubManagerData: clubManagerData, message: message}
    res.status(op1.code).json({data:response})
    return

  } catch (err) {
    console.log(err);
    session.endSession()
    res.status(500).json({ error: 'Server Error' });
  }
};

  // ------------------------------------
  