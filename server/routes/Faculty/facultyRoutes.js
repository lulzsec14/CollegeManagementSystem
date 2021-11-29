//Imports
// Imports
const express = require('express');
const facultyRouter = express.Router();

const {
    getEventById,
    createEvent,
    getEventByClubId,
    getAllEvents,
    updateEvent,
    registration,
    attendance,
    position,
    deleteById,
    deleteByClubId,
  } = require("../../controllers/Events/eventController");


  //Faculty Routes

  facultyRouter.route("/getEventById").get(getEventById);
  facultyRouter.route("/getAllEventsByClubId").get(getEventByClubId);
  facultyRouter.route("/getAllEvents").get(getAllEvents);
  facultyRouter.route("/createEvent").post(createEvent);
  facultyRouter.route("/update").put(updateEvent);
  facultyRouter.route("/registerByEventId").post(registration);
  facultyRouter.route("/attendanceByEventId").post(attendance);
  facultyRouter.route("/setPositionsByEventIdAndEventName").post(position);
  facultyRouter.route("/deleteEventById").delete(deleteById);
  facultyRouter.route("/deleteAllEventsByClubId").delete(deleteByClubId);


// Exports
module.exports = facultyRouter;