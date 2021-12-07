const mongoose = require("mongoose");
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
const {
  updateClubArrayById,
  deleteFromClubArrayById,
} = require("../DBFunctions/clubsDBFunction");

// Imports attendance controller from StudentsConrtoller
const { updateStudentsAttendance } = require("../Student/studentController");

//----------------------------------------------------------------------------------------------------------------

/**
 * Handling post request of creating event with Transactions in:
 * Club array in club DB functions,
 */
exports.createEvent = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    session.startTransaction();
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

    const events = eventData._id.toString();
    const { clubId } = eventData;

    //updating Club array from club db function
    const updateDataForClub = { clubId, dataToUpdate: { events: events } };
    const result1 = await updateClubArrayById(updateDataForClub, session);
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

/**
 * Handling get request of fetching event data by event ID
 */
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

/**
 * Handling get request of fetching event data by club ID
 */
exports.getEventByClubId = async (req, res, next) => {
  try {
    const { clubId } = req.body.data;
    const result = await getAllEventsByClubId(clubId);
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

/**
 * Handling get request of fetching al events data from event model's schema.
 */
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

/**
 * Handling put request of updating event data.
 */
exports.updateEvent = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await updateEventById(data);
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

/**
 * Handling post request of creating registration for an event with Transactions in:
 * Student array in student DB functions,
 */
exports.registration = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const { email } = data.registered;
    session.startTransaction();
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
    const eventsParticipated = registerData._id.toString();

    const updateDataForStudent = {
      email,
      dataToUpdate: { eventsParticipated: eventsParticipated },
    };
    // console.log(registerData.registered);
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

/**
 * Handling post request of maintaing attendance with Transactions in:
 * Student array in student DB functions,
 */
exports.attendance = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const emails = [];
    session.startTransaction();
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
    // console.log(data);

    const attendanceData = result.attendanceData;
    const eventsAttended = attendanceData._id.toString();

    var array = attendanceData.attended;

    for (obj in array) {
      emails.push(array[obj].email);
    }
    // console.log(emails);
    const updateDataForStudent = {
      emails,
      dataToUpdate: { eventsAttended: eventsAttended },
    };

    // console.log(updateDataForStudent);

    const result1 = await updateStudentsAttendance(
      updateDataForStudent,
      session
    );
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    // all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: attendanceData,
    });
    return;
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

/**
 * Handling post request of setting positions for an event.
 */
exports.position = async (req, res, next) => {
  try {
    const data = req.body.data;
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

/**
 * Handling delete request of deleteing event by event ID with Transactions in:
 * Club array in club DB functions,
 */
exports.deleteById = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    session.startTransaction();
    const result = await deleteEventById(data, session);

    console.log(result);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }

    const deletedData = result.eventData;
    const events = deletedData._id.toString();
    const { clubId } = deletedData;

    //deleteing from Club array by club db function
    const deleteDataForClub = { clubId, dataToUpdate: { events: events } };
    const result1 = await deleteFromClubArrayById(deleteDataForClub);
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

//----------------------------------------------------------------------------------------------------------------

/**
 * Handling delete request of deleting an event by club ID.
 */
exports.deleteByClubId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await deleteEventsByClubId(data);
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
