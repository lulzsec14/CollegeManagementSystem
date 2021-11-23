// Imports
const express = require("express");
const eventsRouter = express.Router();
// ------------------------------------

// Constants
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
// ------------------------------------

// Api Route
eventsRouter.route("/getEventById").get(getEventById);
eventsRouter.route("/getEventByClubId").get(getEventByClubId);
eventsRouter.route("/getAllEvent").get(getAllEvents);
eventsRouter.route("/create").post(createEvent);
eventsRouter.route("/update").put(updateEvent);
eventsRouter.route("/registration").post(registration);
eventsRouter.route("/attendance").post(attendance);
eventsRouter.route("/position").post(position);
eventsRouter.route("/delete").delete(deleteById);
eventsRouter.route("/deleteByClubId").delete(deleteByClubId);

// ------------------------------------

// Exports
module.exports = eventsRouter;
// ------------------------------------
