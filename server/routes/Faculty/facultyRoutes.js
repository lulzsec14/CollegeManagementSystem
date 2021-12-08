// Imports
const express = require("express");
const facultyRouter = express.Router();

// controller imports
const {
  getClub,
  updateClub,
} = require("../../controllers/Clubs/clubController");
const {
  addCoreMember,
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
  deleteCoreMember,
} = require("../../controllers/Core Members/coreMemberController");
const {
  getAllClubManagersByClubIndex,
} = require("../../controllers/Club Managers/clubManagerController");
const {
  addTask,
  getTask,
  getAllTasksByClubId,
  updateTask,
  deleteTask,
} = require("../../controllers/Task List/taskListController");
const {
  getFaculty,
  updateFaculty,
} = require("../../controllers/Faculty/facultyController");
const {
  createCertificate,
  getCertificateById,
  getCertificateByStudentId,
  getCertificateByEventId,
  getCertificateByClubId,
  deleteCertificateById,
  deleteCertificateByEventId,
  deleteCertificateByClubId,
} = require("../../controllers/Certificates/certificateController");
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
const { getClub,updateClub } = require('../../controllers/Clubs/clubController');
const { addCoreMember,getCoreMember,getAllCoreMembersByClubIndex,updateCoreMember,deleteCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagersByClubIndex } = require('../../controllers/Club Managers/clubManagerController');
const { addTask,getTask,getAllTasksByClubId,updateTask,deleteTask } = require('../../controllers/Task List/taskListController');
const { getFaculty,updateFaculty,loginFaculty,logOutFaculty  } = require('../../controllers/Faculty/facultyController');

// ------------------------------------


//faculty login and logout Routes
facultyRouter.route("/loginFaculty").post(loginFaculty);
facultyRouter.route("/logoutFaculty").delete(logOutFaculty);

// faculty club Routes
facultyRouter.route("/getClubByIndex").get(getClub);
facultyRouter.route("/updateClubById").put(updateClub);

// faculty core member routes
facultyRouter.route("/addCoreMember").post(addCoreMember);
facultyRouter.route("/getCoreMemberByRollNoAndClubIndex").get(getCoreMember);
facultyRouter.route("/updateCoreMemberById").put(updateCoreMember);
facultyRouter.route("/deleteCoreMemberById").delete(deleteCoreMember);
facultyRouter
  .route("/getAllCoreMembersByClubIndex")
  .get(getAllCoreMembersByClubIndex);

// faculty club manager Routes

facultyRouter
  .route("/getAllClubManagersByClubIndex")
  .get(getAllClubManagersByClubIndex);

// faculty task list routes
facultyRouter.route("/addTask").post(addTask);
facultyRouter.route("/getTaskById").get(getTask);
facultyRouter.route("/updateTaskById").put(updateTask);
facultyRouter.route("/deleteTaskById").delete(deleteTask);
facultyRouter.route("/getAllTasksByClubId").get(getAllTasksByClubId);

// faculty faculty Routes
facultyRouter.route("/getFacultyByEmail").get(getFaculty);
facultyRouter.route("/updateFacultyById").put(updateFaculty);

//faculty certifiacte routes

clubManagerRouter.route("/createCertificate").post(createCertificate);
clubManagerRouter.route("/getCertificateById").get(getCertificateById);
clubManagerRouter
  .route("/getAllCertificatesByStudentId")
  .get(getCertificateByStudentId);
clubManagerRouter
  .route("/getAllCertificatesByEventId")
  .get(getCertificateByEventId);
clubManagerRouter
  .route("/getAllCertificatesByClubId")
  .get(getCertificateByClubId);
clubManagerRouter.route("/deleteCertificateById").delete(deleteCertificateById);
clubManagerRouter
  .route("/deleteAllCertificatesByEventId")
  .delete(deleteCertificateByEventId);
clubManagerRouter
  .route("/deleteAllCertificatesByClubId")
  .delete(deleteCertificateByClubId);

//faculty Events Routes

clubManagerRouter.route("/getEventById").get(getEventById);
clubManagerRouter.route("/getAllEventsByClubId").get(getEventByClubId);
clubManagerRouter.route("/getAllEvents").get(getAllEvents);
clubManagerRouter.route("/createEvent").post(createEvent);
clubManagerRouter.route("/update").put(updateEvent);
clubManagerRouter.route("/registerByEventId").post(registration);
clubManagerRouter.route("/attendanceByEventId").post(attendance);
clubManagerRouter.route("/setPositionsByEventIdAndEventName").post(position);
clubManagerRouter.route("/deleteEventById").delete(deleteById);
clubManagerRouter.route("/deleteAllEventsByClubId").delete(deleteByClubId);

// Exports
module.exports = facultyRouter;
// --------------------------
