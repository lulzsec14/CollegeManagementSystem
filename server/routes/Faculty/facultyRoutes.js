// Imports
const express = require('express');
const facultyRouter = express.Router();

// controller imports
const {
  getClub,
  updateClub,
} = require('../../controllers/Clubs/clubController');
const {
  addCoreMember,
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
  deleteCoreMember,
} = require('../../controllers/Core Members/coreMemberController');
const {
  getAllClubManagersByClubIndex,
} = require('../../controllers/Club Managers/clubManagerController');
const {
  addTask,
  getTask,
  getAllTasksByClubId,
  updateTask,
  deleteTask,
} = require('../../controllers/Task List/taskListController');
const {
  getFaculty,
  updateFaculty,
} = require('../../controllers/Faculty/facultyController');
const {
  createCertificate,
  getCertificateById,
  getCertificateByStudentId,
  getCertificateByEventId,
  getCertificateByClubId,
  deleteCertificateById,
  deleteCertificateByEventId,
  deleteCertificateByClubId,
} = require('../../controllers/Certificates/certificateController');

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
} = require('../../controllers/Events/eventController');

const { checkFaculty } = require('../../middlewares/Auth/facultyMiddleware');

// ------------------------------------

// faculty club Routes
facultyRouter.route('/getClubByIndex').get(checkFaculty, getClub);
facultyRouter.route('/updateClubById').put(checkFaculty, updateClub);

// faculty core member routes
facultyRouter.route('/addCoreMember').post(checkFaculty, addCoreMember);
facultyRouter
  .route('/getCoreMemberByRollNoAndClubIndex')
  .get(checkFaculty, getCoreMember);
facultyRouter
  .route('/updateCoreMemberById')
  .put(checkFaculty, updateCoreMember);
facultyRouter
  .route('/deleteCoreMemberById')
  .delete(checkFaculty, deleteCoreMember);
facultyRouter
  .route('/getAllCoreMembersByClubIndex')
  .get(checkFaculty, getAllCoreMembersByClubIndex);

// faculty club manager Routes

facultyRouter
  .route('/getAllClubManagersByClubIndex')
  .get(checkFaculty, getAllClubManagersByClubIndex);

// faculty task list routes
facultyRouter.route('/addTask').post(checkFaculty, addTask);
facultyRouter.route('/getTaskById').get(checkFaculty, getTask);
facultyRouter.route('/updateTaskById').put(checkFaculty, updateTask);
facultyRouter.route('/deleteTaskById').delete(checkFaculty, deleteTask);
facultyRouter
  .route('/getAllTasksByClubId')
  .get(checkFaculty, getAllTasksByClubId);

// faculty faculty Routes
facultyRouter.route('/getFacultyByEmail').get(checkFaculty, getFaculty);
facultyRouter.route('/updateFacultyById').put(checkFaculty, updateFaculty);

//faculty certifiacte routes

facultyRouter.route('/createCertificate').post(checkFaculty, createCertificate);
facultyRouter
  .route('/getCertificateById')
  .get(checkFaculty, getCertificateById);
facultyRouter
  .route('/getAllCertificatesByStudentId')
  .get(checkFaculty, getCertificateByStudentId);
facultyRouter
  .route('/getAllCertificatesByEventId')
  .get(checkFaculty, getCertificateByEventId);
facultyRouter
  .route('/getAllCertificatesByClubId')
  .get(checkFaculty, getCertificateByClubId);
facultyRouter
  .route('/deleteCertificateById')
  .delete(checkFaculty, deleteCertificateById);
facultyRouter
  .route('/deleteAllCertificatesByEventId')
  .delete(checkFaculty, deleteCertificateByEventId);
facultyRouter
  .route('/deleteAllCertificatesByClubId')
  .delete(checkFaculty, deleteCertificateByClubId);

//faculty Events Routes

facultyRouter.route('/getEventById').get(checkFaculty, getEventById);
facultyRouter
  .route('/getAllEventsByClubId')
  .get(checkFaculty, getEventByClubId);
facultyRouter.route('/getAllEvents').get(checkFaculty, getAllEvents);
facultyRouter.route('/createEvent').post(checkFaculty, createEvent);
facultyRouter.route('/update').put(checkFaculty, updateEvent);
facultyRouter.route('/registerByEventId').post(checkFaculty, registration);
facultyRouter.route('/attendanceByEventId').post(checkFaculty, attendance);
facultyRouter
  .route('/setPositionsByEventIdAndEventName')
  .post(checkFaculty, position);
facultyRouter.route('/deleteEventById').delete(checkFaculty, deleteById);
facultyRouter
  .route('/deleteAllEventsByClubId')
  .delete(checkFaculty, deleteByClubId);

// Exports
module.exports = facultyRouter;
// --------------------------
