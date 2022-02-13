// Imports
const mongoose = require('mongoose')
const {
  insertCoreMember,
  updateCoreMemberById,
  getCoreMemberByRollNoAndClubIndex,
  getCoreMembersByClubIndex,
  deleteCoreMemberById,
  loginCoreMember

} = require('../DBFunctions/coreMemberDBFunction');

const {
  deleteTasksByCoreMemberId

} = require('../DBFunctions/taskListDBFunction')

const {
  getStudentByRollNo

} = require('../DBFunctions/studentDBFunction')

const {
  updateClubArrayByIndex,
  deleteFromClubArrayByIndex

} = require('../DBFunctions/clubsDBFunction')
const {
  filterData,
  filterData2D
} = require('../../utilities/filterData')

// ------------------------------------

// Adding Core Member
exports.addCoreMember = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    const {
      studentRollNo
    } = data1
    const op = await getStudentByRollNo({
      rollNo: studentRollNo
    })
    if (!op.success) {
      await session.endSession()
      res.status(op.code).json({
        error: op.error
      })
      return
    }
    session.startTransaction()
    const op1 = await insertCoreMember(data1, session);
    if (!op1.success) {
      await session.abortTransaction()
      await session.endSession()
      res.status(op1.code).json({
        error: op1.error
      })
      return
    }
    const {
      coreMemberData
    } = op1
    const {
      _id,
      clubIndex
    } = coreMemberData
    const coreMembers = _id.toString()
    const data2 = {
      clubIndex,
      dataToUpdate: {
        coreMembers: coreMembers
      }
    }
    const op2 = await updateClubArrayByIndex(data2, session)
    if (!op2.success) {

      await session.abortTransaction()
      await session.endSession()
      res.status(op2.code).json({
        error: op2.error
      })
      return

    }
    await session.commitTransaction()
    await session.endSession()
    const message = op1.message
    const filteredData = filterData(coreMemberData, {
      studentRollNo: 1,
      clubIndex: 1,
      role: 1,
      password: 0,
      taskList: 0
    })
    const response = {
      coreMemberData: filteredData,
      message: message
    };
    res.status(op1.code).json({
      data: response
    })
    return

  } catch (err) {
    console.log(err);
    await session.endSession()
    res.status(500).json({
      error: 'Server Error'
    });
  }
};

// updating Core Member 
exports.updateCoreMember = async (req, res, next) => {

  try {
    const data1 = req.body.data;
    const op1 = await updateCoreMemberById(data1);
    if (!op1.success) {
      res.status(op1.code).json({
        error: op1.error
      })
      return
    }
    const {
      coreMemberData
    } = op1
    const message = op1.message
    const filteredData = filterData(coreMemberData, {
      studentRollNo: 1,
      clubIndex: 1,
      role: 1,
      password: 0,
      taskList: 0
    })
    const response = {
      coreMemberData: filteredData,
      message: message
    };
    res.status(op1.code).json({
      data: response
    })
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Server Error'
    });
  }
};

// get Core Member
exports.getCoreMember = async (req, res, next) => {

  try {
    const data1 = req.query;
    const op1 = await getCoreMemberByRollNoAndClubIndex(data1);
    if (!op1.success) {
      res.status(op1.code).json({
        error: op1.error
      })
      return
    }
    const {
      coreMemberData
    } = op1
    const message = op1.message
    const filteredData = filterData(coreMemberData, {
      studentRollNo: 1,
      clubIndex: 1,
      role: 1,
      password: 0,
      taskList: 0
    })
    const response = {
      coreMemberData: filteredData,
      message: message
    };
    res.status(op1.code).json({
      data: response
    })
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Server Error'
    });
  }
};


// get all Core Members of a club 
exports.getAllCoreMembersByClubIndex = async (req, res, next) => {
  try {
    const data1 = req.query;
    const op1 = await getCoreMembersByClubIndex(data1);
    if (!op1.success) {
      res.status(op1.code).json({
        error: op1.error
      })
      return
    }
    const {
      coreMemberData
    } = op1
    const message = op1.message
    const filteredData = filterData2D(coreMemberData, {
      studentRollNo: 1,
      clubIndex: 1,
      role: 1,
      password: 0,
      taskList: 0
    })
    const response = {
      coreMemberData: filteredData,
      message: message
    };
    res.status(op1.code).json({
      data: response
    })
    return

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Server Error'
    });
  }
};

// delete Core Member
exports.deleteCoreMember = async (req, res, next) => {

  const session = await mongoose.startSession()
  try {
    const data1 = req.body.data;
    session.startTransaction()
    const op1 = await deleteCoreMemberById(data1, session);
    if (!op1.success) {
      await session.abortTransaction()
      await session.endSession()
      res.status(op1.code).json({
        error: op1.error
      })
      return
    }
    const {
      coreMemberData
    } = op1
    const {
      _id,
      clubIndex
    } = coreMemberData
    const coreMembers = _id.toString()
    const data2 = {
      clubIndex,
      dataToUpdate: {
        coreMembers: coreMembers
      }
    }
    const op2 = await deleteFromClubArrayByIndex(data2, session)
    if (!op2.success) {

      await session.abortTransaction()
      await session.endSession()
      res.status(op2.code).json({
        error: op2.error
      })
      return

    }
    const coreMemberId = _id.toString()
    const data3 = {
      coreMemberId
    }
    const op3 = await deleteTasksByCoreMemberId(data3, session)
    if (!op3.success) {

      await session.abortTransaction()
      await session.endSession()
      res.status(op3.code).json({
        error: op3.error
      })
      return

    }
    await session.commitTransaction()
    await session.endSession()
    const message = op1.message
    const filteredData = filterData(coreMemberData, {
      studentRollNo: 1,
      clubIndex: 1,
      role: 1,
      password: 0,
      taskList: 0
    })
    const response = {
      coreMemberData: filteredData,
      message: message
    };
    res.status(op1.code).json({
      data: response
    })
    return

  } catch (err) {
    console.log(err);
    await session.endSession()
    res.status(500).json({
      error: 'Server Error'
    });
  }
};


//login core member
exports.loginCoreMember = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await loginCoreMember(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: false,
        error: result.error
      });
    } else {
      req.session.isAuth = true;
      req.session.bearerToken = process.env.CORE_MEMBER_TOKEN;
      res.status(200).json({
        success: true,
        message: result.message
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/// logout core member
exports.logOutCoreMember = async (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          success: true,
          message: 'Core Member logged out',
        });
      });
    } else {
      res.status(400).json({
        success: true,
        message: 'Session not found',
      });

    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ------------------------------------