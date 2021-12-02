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
  deleteFromClubArrayById,
  updateClubArrayById,
  updateClubArrayByIndex,
} = require('../DBFunctions/clubsDBFunction');
// ------------------------------------

exports.createNewRequest = async (req, res, next) => {
  const data = req.body;

  let updateStudentArrayData = {
    rollNo: data.rollNo,
    dataToUpdate: {
      clubsRequested: data.clubId,
    },
  };

  let updateClubArrayData = {
    clubId: data.clubId,
    dataToUpdate: {
      requests: data.studentId,
    },
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const createdRequest = await createRequest(data, session);

    console.log(createdRequest.requestData._id);

    updateClubArrayData.dataToUpdate.requests = createdRequest.requestData._id;
    updateStudentArrayData.dataToUpdate.clubsRequested =
      createdRequest.requestData._id;

    // console.log(updateStudentArrayData);
    // console.log(updateClubArrayData);

    // Get student data 

    if (createdRequest.success == false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(createdRequest.code)
        .json({ success: false, error: createdRequest.error });

      return;
    }

    const updatedStudentRequest = await updateStudentArrayByRollNo(
      updateStudentArrayData,
      session
    );

    if (updatedStudentRequest.success == false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(updatedStudentRequest.code)
        .json({ success: false, error: updatedStudentRequest.error });
      return;
    }

    const updatedClubRequest = await updateClubArrayById(
      updateClubArrayData,
      session
    );

    if (updatedClubRequest.success == false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(updatedClubRequest.code)
        .json({ success: false, error: updatedClubRequest.error });
      return;
    }

    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({
      success: true,
      message: 'Request created successfully',
      requestData: createdRequest.requestData,
    });
    return;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
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
  const data = req.body;
  let toBeDeletedRequest = {};
  let dataToDeleteFromStudentArray = {};
  let dataToDeleteFromClubsArray = {};

  let dataForUpdatingStudentArray = {};
  let dataForUpdatingClubsArray = {};
  let dataForDeletingRequest = {};

  try {
    toBeDeletedRequest = await getRequest(data);

    dataToDeleteFromStudentArray = {
      rollNo: toBeDeletedRequest.requestData.rollNo,
      dataToUpdate: {
        clubsRequested: toBeDeletedRequest.requestData._id,
      },
    };

    dataToDeleteFromClubsArray = {
      clubId: toBeDeletedRequest.requestData.clubId,
      dataToUpdate: {
        requests: toBeDeletedRequest.requestData._id,
      },
    };

    dataForUpdatingStudentArray = {
      rollNo: toBeDeletedRequest.requestData.rollNo,
      dataToUpdate: {
        clubsJoined: toBeDeletedRequest.requestData.clubId,
      },
    };

    dataForUpdatingClubsArray = {
      clubId: toBeDeletedRequest.requestData.clubId,
      dataToUpdate: {
        clubMembers: toBeDeletedRequest.requestData.studentId,
      },
    };

    dataForDeletingRequest = {
      requestId: toBeDeletedRequest.requestData._id,
    };

    if (toBeDeletedRequest.success === false) {
      res
        .status(400)
        .json({ success: false, error: "Couldn't fetch Request data!" });
      return;
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
    return;
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // console.log(toBeDeletedRequest);

    // console.log(dataToDeleteFromStudentArray);

    // console.log(dataToDeleteFromClubsArray);

    // console.log(dataForUpdatingStudentArray);

    // console.log(dataForUpdatingClubsArray);

    // console.log(dataForDeletingRequest);

    const deletedFromStudentArray = await deleteFromStudentArrayByRollNo(
      dataToDeleteFromStudentArray,
      session
    );

    if (deletedFromStudentArray.success === false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(deletedFromStudentArray.code)
        .json({ success: false, error: deletedFromStudentArray.error });
      return;
    }

    const deletedFromClubsArray = await deleteFromClubArrayById(
      dataToDeleteFromClubsArray,
      session
    );

    if (deletedFromClubsArray.success === false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(deletedFromClubsArray.code)
        .json({ success: false, error: deletedFromClubsArray.error });
      return;
    }

    const addedToStudentArray = await updateStudentArrayByRollNo(
      dataForUpdatingStudentArray,
      session
    );

    if (addedToStudentArray.success === false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(addedToStudentArray.code)
        .json({ success: false, error: addedToStudentArray.error });
      return;
    }

    const addedToClubsArray = await updateClubArrayById(
      dataForUpdatingClubsArray,
      session
    );

    if (addedToClubsArray.success === false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(addedToClubsArray.code)
        .json({ success: false, error: addedToClubsArray.error });
      return;
    }

    const deleteClubJoinRequest = await deleteRequestById(
      dataForDeletingRequest,
      session
    );

    if (deleteClubJoinRequest.success === false) {
      await session.abortTransaction();
      await session.endSession();
      res
        .status(deleteClubJoinRequest.code)
        .json({ success: false, error: deleteClubJoinRequest.error });
      return;
    }

    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({
      success: true,
      message: 'Club Member added Successfully!',
      requestData: addedToClubsArray,
    });
    return;
    // }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ success: false, error: err.message });
  }
};

// exports.deleteOneRequestById = async (req, res, next) => {
//   const data = req.body;
//   try {
//     const result = await deleteRequestById(data);
//     if (result.success == false) {
//       res.status(result.code).json({ success: false, error: result.error });
//     } else {
//       res.status(result.code).json({
//         success: true,
//         message: result.message,
//         requestData: result.requestData,
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
