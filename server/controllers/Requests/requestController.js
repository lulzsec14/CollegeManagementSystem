// Imports
const {
  createRequest,
  getAllRequests,
  getRequest,
  getRequestById,
  deleteRequest,
  deleteRequestById,
  getRequestByClubId,
  getAllRequestByRoll,
} = require('../DBFunctions/requestDBFunction');
const mongoose = require('mongoose');
const {
  updateStudentArrayByRollNo,
  deleteFromStudentArrayByRollNo,
} = require('../DBFunctions/studentDBFunction');
const {
  updateClubByID,
  deleteFromClubArrayByID,
  updateClubArrayByID,
  updateClubArrayByIndex,
} = require('../DBFunctions/clubsDBFunction');
// ------------------------------------

exports.createNewRequest = async (req, res, next) => {
  const data = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let createdRequest = await createRequest(data, session);

    if (createdRequest.success == false) {
      await session.abortTransaction();
      // await session.endSession();
      res
        .status(createdRequest.code)
        .json({ success: false, error: createdRequest.error });
    }
    console.log('HERE 1');

    const updatedStudentRequest = await updateStudentArrayByRollNo(
      data,
      session
    );

    console.log('HERE 2');
    console.log(updatedStudentRequest);
    if (updatedStudentRequest.success == false) {
      await session.abortTransaction();
      // await session.endSession();
      res
        .status(updatedStudentRequest.code)
        .json({ success: false, error: updatedStudentRequest.error });
    }

    const updatedClubRequest = await updateClubArrayByID(data, session);

    if (updatedClubRequest.success == false) {
      await session.abortTransaction();
      res
        .status(updatedClubRequest.code)
        .json({ success: false, error: updatedClubRequest.error });
    }
    console.log('HERE 3');

    if (updatedClubRequest.success == true) {
      console.log('Here');
      await session.commitTransaction();
      // await session.endSession();
      console.log('HERE 4');
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    console.log('HERE');
    session.abortTransaction();
    res.status(500).json({ success: false, error: err.message });
  }

  await session.endSession();
};

exports.retrieveAllRequests = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getAllRequests();
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequest = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequest(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequestById = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequestById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequestByClubId = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequestByClubId(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveAllRequestByRollNo = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getAllRequestByRoll(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteOneRequest = async (req, res, next) => {
  // const session = await mongoose.startSession();
  const data = req.body;
  try {
    const toBeDeletedRequest = await getRequest(data);
    if (toBeDeletedRequest.success === false) {
      session.endSession();
      res
        .status(400)
        .json({ success: false, error: 'Couldnt fetch Request data!' });
    }

    console.log(toBeDeletedRequest);

    // await session.startTransaction();

    // const deletedFromStudentArray = await deleteFromStudentArrayByRollNo(
    //   data,
    //   session
    // );

    // if (deletedFromStudentArray.success === false) {
    //   session.abortTransaction();
    //   session.endSession();
    //   res
    //     .status(deletedFromStudentArray.code)
    //     .json({ success: false, error: deletedFromStudentArray.error });
    // }

    // const deletedFromClubsArray = await deleteFromClubArrayByID(data, session);

    // if (deletedFromClubsArray.success === false) {
    //   session.abortTransaction();
    //   session.endSession();
    //   res
    //     .status(deletedFromClubsArray.code)
    //     .json({ success: false, error: deletedFromClubsArray.error });
    // }

    // data.dataToUpdate = dataToUpdate;

    let details = {
      clubsJoined: data.clubId,
    };
    let dataForUpdatingStudent = data;
    dataForUpdatingStudent.dataToUpdate = details;

    console.log(dataForUpdatingStudent);

    // const addedToStudentArray = await updateStudentArrayByRollNo(
    //   dataForUpdatingStudent,
    //   session
    // );

    // if (addedToStudentArray.success === false) {
    //   session.abortTransaction();
    //   session.endSession();
    //   res
    //     .status(addedToStudentArray.code)
    //     .json({ success: false, error: addedToStudentArray.error });
    // }

    details = {
      clubMembers: toBeDeletedRequest.studentId,
    };

    let dataForUpdatingClubMembers = data;
    dataForUpdatingClubMembers.dataToUpdate = details;

    console.log(dataForUpdatingClubMembers);

    // const addedToClubsArray = await updateClubArrayByID(
    //   dataForUpdatingClubMembers,
    //   session
    // );

    // if (addedToClubsArray.success === false) {
    //   session.abortTransaction();
    //   session.endSession();
    //   res
    //     .status(addedToClubsArray.code)
    //     .json({ success: false, error: addedToClubsArray.error });
    // }

    // const result = await deleteRequest(data, session);
    // if (result.success === false) {
    //   res.status(result.code).json({ success: false, error: result.error });
    // } else {
    //   res.status(200).json({
    //     success: true,
    //     message: result.message,
    //     requestData: result.requestData,
    //   });
    // }
  } catch (err) {
    // session.abortTransaction();
    await session.endSession();
    res.status(500).json({ success: false, error: err.message });
  }
  // await session.endSession();
};

exports.deleteOneRequestById = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await deleteRequestById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
