const Events = require("../../models/Events");
const validateEvent = require("../../Validators/EventValidator");

// exports.getEvent = async (data) => {
//   try {
//     const { eventName, clubId } = data;
//     const findEvent = await Events.findOne({ clubId, eventName });
//     if (!findEvent) {
//       return {
//         success: false,
//         error: "Event in given with given event name does not exist!",
//         code: 404,
//       };
//     }
//     return {
//       success: true,
//       code: 200,
//       message: "Event with given name found successfully!",
//       eventData: findEvent,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error,
//       code: 404,
//     };
//   }
// };

//--------------------------------------------------------------

exports.getEventById = async (data) => {
  try {
    const { eventId } = data;
    const findEvent = await Events.findById(eventId);

    if (!findEvent) {
      return {
        success: false,
        error: "Event with given Id does not exist!",
        code: 404,
      };
    }

    return {
      success: true,
      code: 200,
      message: "Event with given Id found successfully!",
      eventData: findEvent,
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "Server Error!",
    };
  }
};

//--------------------------------------------------------------

exports.getAllEventsByClubId = async (data) => {
  try {
    const findClubIdEvents = await Events.find({ clubId: data });
    if (!findClubIdEvents) {
      return {
        success: false,
        error: "Events with given Club Id does not exist!",
        code: 404,
      };
    }
    // console.log(findClubIdEvents);
    return {
      success: true,
      code: 200,
      message: "Events with given Club Id found successfully!",
      eventData: findClubIdEvents,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Server Error!",
      code: 500,
    };
  }
};

//--------------------------------------------------------------

exports.getAllEvents = async () => {
  try {
    const findEvents = await Events.find({ isPrivate: false });
    if (!findEvents) {
      return {
        success: false,
        error: "There are no events!",
        code: 404,
      };
    }
    return {
      success: true,
      eventData: findEvents,
      code: 200,
      message: "All non private events found successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server Error!",
      code: 500,
    };
  }
};

//--------------------------------------------------------------

exports.createEvent = async (data, session) => {
  const error = validateEvent(data);
  if (error) {
    return {
      success: false,
      code: 400,
      error,
    };
  }

  try {
    const {
      clubId,
      isPrivate,
      eventName,
      eventDescription,
      posterURL,
      eventTime,
      eventDate,
      eventVenue,
      deadlineTime,
    } = data;

    const findEvent = await Events.findOne({ eventName, clubId }).session(
      session
    );
    if (findEvent) {
      return {
        success: false,
        error: "Event with given name already exists!",
        code: 403,
      };
    }
    const event = new Events({
      clubId,
      isPrivate,
      eventName,
      eventDescription,
      posterURL,
      eventTime,
      eventDate,
      eventVenue,
      deadlineTime,
    });
    const eventCreated = await event.save({ session });
    return {
      success: true,
      eventData: eventCreated,
      code: 201,
      message: "Event created Succesfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//--------------------------------------------------------------

exports.updateEventById = async (data) => {
  try {
    const dataToUpdate = {};
    for (key in data) {
      if (key !== "eventId" && key !== "clubId") {
        dataToUpdate[key] = data[key];
      }
    }
    const { eventId } = data;
    const findEvent = await Events.findById(eventId);
    if (!findEvent) {
      return {
        success: false,
        error: "Event does not exist!",
        code: 404,
      };
    }
    // console.log(dataToUpdate);
    const eventUpdated = await Events.findByIdAndUpdate(
      eventId,
      {
        $set: dataToUpdate,
      },
      { new: true }
    );
    console.log(eventUpdated);
    return {
      success: true,
      eventData: eventUpdated,
      code: 201,
      message: "Event updated successfully",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      code: 500,
      error: "Server Error",
    };
  }
};

//get method not needed as we can call getEventById instead.
//--------------------------------------------------------------

// exports.getRegistrationsByEventId = async (data) => {
//   try {
//     const { eventId } = data;
//     const findEvent = await Events.findOne({ eventId });
//     if (!findEvent) {
//       return {
//         success: false,
//         code: 404,
//         error: "Event does not exist!",
//       };
//     }
//     const registrations = await Events.find({ eventId });
//     if (!registrations) {
//       return {
//         success: false,
//         code: 404,
//         error: "No Registrations yet!",
//       };
//     }
//     return {
//       success: true,
//       code: 200,
//       eventData: registrations,
//       message: "Registrations found successfully!",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       code: 500,
//       error,
//     };
//   }
// };

// //--------------------------------------------------------------

// exports.getAttendenceByEventId = async () => {
//   try {
//     const { eventId } = data;
//     const findEvent = await Events.findOne({ eventId });
//     if (!findEvent) {
//       return {
//         success: false,
//         code: 404,
//         error: "Event does not exist!",
//       };
//     }
//     const attendance = await Events.find({ eventId });
//     if (!attendance) {
//       return {
//         success: false,
//         code: 204,
//         error: "Attendance not taken yet!",
//       };
//     }
//     return {
//       success: true,
//       code: 200,
//       eventData: attendance,
//       message: "Attendence found successfully!",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       code: 500,
//       error,
//     };
//   }
// };

// //--------------------------------------------------------------

// exports.getPositionsByEventId = async () => {
//   try {
//     const { eventId } = data;
//     const findEvent = await Events.findOne({ eventId });
//     if (!findEvent) {
//       return {
//         success: false,
//         code: 404,
//         error: "Event does not exist!",
//       };
//     }
//     const positionsData = await Events.findOne({ position });
//     if (!positionsData) {
//       return {
//         success: false,
//         code: 204,
//         error: "Positions not defined yet!",
//       };
//     }
//     return {
//       success: true,
//       code: 200,
//       eventData: positionsData,
//       message: "Top 3 positions found successfully!",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       code: 500,
//       error,
//     };
//   }
// };

//--------------------------------------------------------------

exports.setRegistrationsByEventId = async (data, session) => {
  try {
    const dataToUpdate = {};
    let email = null;
    for (key in data) {
      if (key === "registered") {
        email = data[key].email;
        dataToUpdate[key] = data[key];
      }
    }
    const { eventId } = data;

    const findEvent = await Events.findById(eventId).session(session);

    if (!findEvent) {
      return {
        success: false,
        code: 404,
        error: "Event does not exist.",
      };
    }

    const alreadyRegistered = await Events.find({
      _id: eventId,
      "registered.email": email,
    }).session(session);

    if (alreadyRegistered.length) {
      return {
        success: false,
        code: 404,
        error: "User already registered!",
      };
    }

    const newRegistration = await Events.findByIdAndUpdate(
      eventId,
      {
        $addToSet: dataToUpdate,
      },
      { new: true }
    ).session(session);

    return {
      success: true,
      code: 200,
      registrationData: newRegistration,
      message: "Candidate Registered successfully!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      code: 500,
      error: "Server Error!",
    };
  }
};

//--------------------------------------------------------------

exports.setAttendanceByEventId = async (data, session) => {
  try {
    // console.log(data);

    let dataToUpdate = [];
    dataToUpdate = data.attended;

    // console.log(dataToUpdate);

    const { eventId } = data;
    // console.log(eventId);

    const findEvent = await Events.findById(eventId).session(session);
    if (!findEvent) {
      return {
        success: false,
        code: 404,
        error: "Event does not exist.",
      };
    }

    const newAttendance = await Events.findByIdAndUpdate(
      eventId,
      {
        $set: {
          attended: dataToUpdate,
        },
      },
      { new: true }
    ).session(session);

    return {
      success: true,
      code: 200,
      attendanceData: newAttendance,
      message: "Candidate marked successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: 500,
      error: "Server Error!",
    };
  }
};

//--------------------------------------------------------------

exports.setPositionsByEventId = async (data) => {
  try {
    const dataToUpdate = {};
    for (key in data) {
      if (key !== "eventId" && key !== "eventName") {
        dataToUpdate[key] = data[key];
      }
    }
    const { eventId, eventName } = data;

    const findEvent = await Events.findOne({ eventId, eventName });
    if (!findEvent) {
      return {
        success: false,
        code: 404,
        error: "Event does not exist.",
      };
    }

    const newPositions = await Events.findOneAndUpdate(
      { eventId, eventName },
      {
        $set: dataToUpdate,
      },
      { new: true }
    );

    return {
      success: true,
      code: 200,
      positionData: newPositions,
      message: "Top 3 decided successfully!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      code: 500,
      error: "Server Error!",
    };
  }
};

//--------------------------------------------------------------

exports.deleteEventById = async (data, session) => {
  try {
    const { eventId } = data;

    const findEvent = await Events.findById(eventId).session(session);

    if (!findEvent) {
      return {
        success: false,
        code: 404,
        error: "Event does not exist.",
      };
    }
    const eventDeleted = await Events.findByIdAndDelete(eventId).session(
      session
    );
    return {
      success: true,
      code: 200,
      eventData: eventDeleted,
      message: "Event Deleted successfully!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      code: 500,
      error: "Server Error!",
    };
  }
};

//--------------------------------------------------------------

exports.deleteEventsByClubId = async (data) => {
  try {
    const { clubId } = data;
    const eventDeleted = await Events.deleteMany({ clubId });
    return {
      success: true,
      code: 200,
      eventData: eventDeleted,
      message: "Event Deleted successfully!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      code: 500,
      error: "Server Error!",
    };
  }
};
