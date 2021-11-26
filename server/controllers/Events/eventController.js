// Imports DB functions of Events
const {
  createEvent,
  getEventById,
  getAllEventsByClubId,
  getAllEvents,
  updateEventById,
  setRegistrationsByEventId,
  setAttendanceByEventId,
  setPositionsByEventId,
  deleteEventById,
  deleteEventsByClubId,
} = require("../DBFunctions/eventsDBFunction");

// Imports DB functions of Student
const { updateStudentArray } = require("../DBFunctions/studentDBFunction");

// Imports DB functions of Club
const { updateClubArrayByClubID } = require("../DBFunctions/clubsDBFunction");

//----------------------------------------------------------------------------------------------------------------

//No multiples(Check)
exports.createEvent = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = await createEvent(data, session);
    if (result.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }
    const eventData = result.eventData;

    const events = eventData._id;
    const { clubId } = eventData;

    //updating Club array from club db function
    const updateDataForClub = { clubId, events };
    const result1 = await updateClubArrayByClubID(updateDataForClub, session);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: eventData,
    });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  session.endSession();
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.getEventById = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getEventById(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.eventData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.getEventByClubId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getAllEventsByClubId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.eventData,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.getAllEvents = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getAllEvents(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.eventData,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

//OK------(in updateDb function $addToSet not working so changed to $set)
exports.updateEvent = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await updateEventById(data, session);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }
    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: result.eventData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.registration = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = await setRegistrationsByEventId(data, session);
    if (result.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }

    const registerData = result.registrationData;
    const eventsParticipated = registerData._id;
    const { email } = registerData;

    const updateDataForStudent = {
      email,
      dataToUpdate: { eventsParticipated: eventsParticipated },
    };
    const result1 = await updateStudentArray(updateDataForStudent, session);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: registerData,
    });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  session.endSession();
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.attendance = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = await setAttendanceByEventId(data, session);
    if (result.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }

    const attendanceData = result.attendanceData;
    const eventsAttended = attendanceData._id;
    const { email } = attendanceData;

    const updateDataForStudent = {
      email,
      dataToUpdate: { eventsAttended: eventsAttended },
    };
    const result1 = await updateStudentArray(updateDataForStudent, session);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: attendanceData,
    });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  session.endSession();
};

///----------------------------------------------------------------------------------------------------------------

//OK(Changed event model again)
exports.position = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await setPositionsByEventId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.positionData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------

//OK
exports.deleteById = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = await deleteEventById(data, session);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    }

    const deletedData = result.eventData;
    const events = deletedData._id;
    const { clubId } = deletedData;

    //deleteing from Club array by club db function
    const deleteDataForClub = { clubId, events };
    const result1 = await deleteFromClubArrayByID(deleteDataForClub);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: deletedData,
    });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  session.endSession();
};

//---------------------------TODO TRANSACTION(SAME PROBLEM OF DELETEMANY)-------------------------------------------------------------------------------------

//OK
exports.deleteByClubId = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await deleteEventsByClubId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.eventData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------
