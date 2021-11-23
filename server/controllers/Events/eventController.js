// Imports
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

// ------------------------------------

//No multiples
exports.createEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createEvent(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res
        .status(result.code)
        .json({ success: result.success, message: result.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------

//OK
exports.getEventById = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getEventById(data);
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

// ------------------------------------

//OK
exports.getEventByClubId = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getAllEventsByClubId(data);
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

// ------------------------------------

//OK
exports.getAllEvents = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getAllEvents(data);
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

// ------------------------------------

//OK------(in updateDb function $addToSet not working so changed to $set)
exports.updateEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await updateEventById(data);
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

// ------------------------------------

//OK
exports.registration = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await setRegistrationsByEventId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.registrationData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------

//OK
exports.attendance = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await setAttendanceByEventId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.attendanceData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------------

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

// ------------------------------------

//OK
exports.deleteById = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await deleteEventById(data);
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

// ------------------------------------

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

// ------------------------------------
