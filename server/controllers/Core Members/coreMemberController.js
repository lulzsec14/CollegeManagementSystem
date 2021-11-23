// Imports
const {
    insertCoreMember,
    updateCoreMemberByID,
    getCoreMemberByRollNo,
    getCoreMembersByClubID,
    deleteCoreMemberByID
      
    } = require('../DBFunctions/CoreMemberDBFunction');
    
const {
    deleteTasksByCoreMemberID
  
  } = require('../DBFunctions/taskListDBFunction')

const {
    getStudentByRollNo
  
  } = require('../DBFunctions/studentDBFunction')

  const {
    updateClubArrayByID,
    deleteFromClubArrayByID
  
  } = require('../DBFunctions/clubsDBFunction')


    // ------------------------------------
    
    // Adding Core Member
    exports.addCoreMember = async (req, res, next) => {
      const session = await mongoose.startSession()
      try {
        const data1 = req.body.data;
        session.startTransaction()
        const { studentRollNo } = data1
        const op = await getStudentByRollNo({studentRollNo: studentRollNo},session)
        if(!op.success){
            session.abortTransaction()
            session.endSession()
            res.status(op.code).json({error:op.error})
            return

        } 
        const op1 = await insertCoreMember(data1,session);
        if(!op1.success) {
          session.abortTransaction()
          session.endSession()
          res.status(op1.code).json({error:op1.error})
          return
        }
        const { coreMemberData } = op1
        const { _id, clubID } = coreMemberData
        const coreMembers = _id
        const data2 = {clubID,coreMembers}
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
        const response = {coreMemberData: coreMemberData, message: message}
        res.status(op1.code).json({data:response})
        return
    
      } catch (err) {
        console.log(err);
        session.endSession()
        res.status(500).json({ error: 'Server Error' });
      }
    };
  
  // updating Core Member 
  exports.updateCoreMember = async (req, res, next) => {
    
    try {
      const data1 = req.body.data;
      const op1 = await updateCoreMemberByID(data1);
      if(!op1.success) {
        res.status(op1.code).json({error:op1.error})
        return
      }
      const {coreMemberData} = op1
      const message = op1.message
      const response = {coreMemberData: coreMemberData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // get Core Member
  exports.getCoreMember = async (req, res, next) => {
    
    try {
      const data1 = req.body.data;
      const op1 = await getCoreMemberByRollNo(data1);
      if(!op1.success) {
        res.status(op1.code).json({error:op1.error})
        return
      }
      const {coreMemberData} = op1
      const message = op1.message
      const response = {coreMemberData: coreMemberData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };  
  
  
  // get all Core Members of a club
  exports.getAllCoreMembers = async (req, res, next) => {
    
    try {
      const data1 = req.body.data;
      const op1 = await getCoreMembersByClubID(data1);
      if(!op1.success) {
        res.status(op1.code).json({error:op1.error})
        return
      }
      const {coreMemberData} = op1
      const message = op1.message
      const response = {coreMemberData: coreMemberData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };  
  
  // delete Core Member
  exports.deleteCoreMember = async (req, res, next) => {
    
    const session = await mongoose.startSession()
    try {
      const data1 = req.body.data;
      session.startTransaction()
      const op1 = await deleteCoreMemberByID(data1,session);
      if(!op1.success) {
        session.abortTransaction()
        session.endSession()
        res.status(op1.code).json({error:op1.error})
        return
      }
      const {coreMemberData } = op1
      const { _id, clubID } = coreMemberData
      const coreMembers = _id
      const data2 = {clubID,coreMembers}
      const op2 = await deleteFromClubArrayByID(data2,session)
      if(!op2.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op2.code).json({error:op2.error})
        return
  
      }
      const coreMemberID = _id
      const data3 = {coreMemberID}
      const op3 = await deleteTasksByCoreMemberID(data3,session)
      if(!op3.success){
        
        session.abortTransaction()
        session.endSession()
        res.status(op3.code).json({error:op3.error})
        return
  
      }
      await session.commitTransaction()
      session.endSession() 
      const message = op1.message
      const response = {coreMemberData: coreMemberData, message: message}
      res.status(op1.code).json({data:response})
      return
  
    } catch (err) {
      console.log(err);
      session.endSession()
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
    // ------------------------------------
    