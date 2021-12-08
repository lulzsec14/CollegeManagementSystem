// Imports
const express = require('express');
const clubManagerRouter = express.Router();

// controller imports

const {
  getClub,
  updateClub,
} = require('../../controllers/Clubs/clubController');
const {
  getClubManager,
  getAllClubManagersByClubIndex,
  updateClubManager,
} = require('../../controllers/Club Managers/clubManagerController');
const {
  addCoreMember,
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
  deleteCoreMember,
} = require('../../controllers/Core Members/coreMemberController');
const {
  addTask,
  getTask,
  getAllTasksByClubId,
  updateTask,
  deleteTask,
} = require('../../controllers/Task List/taskListController');
const {
  createIdea,
  getIdea,
  getIdeasByClub,
  deleteIdea,
} = require('../../controllers/Idea Box/ideaBoxController');
const {
  getFeedback,
  getFeedbacksByClub,
  deleteFeedback,
} = require('../../controllers/Feedback/feedbackController');
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
const {
  checkClubManager,
} = require('../../middlewares/Auth/clubManagerMiddleware');

// ------------------------------------

// club Manager club Routes
clubManagerRouter.route('/getClubByIndex').get(checkClubManager, getClub);
clubManagerRouter.route('/updateClubById').put(checkClubManager, updateClub);

// club manager core member routes
clubManagerRouter.route('/addCoreMember').post(checkClubManager, addCoreMember);
clubManagerRouter
  .route('/getCoreMemberByRollNoAndClubIndex')
  .get(checkClubManager, getCoreMember);
clubManagerRouter
  .route('/updateCoreMemberById')
  .put(checkClubManager, updateCoreMember);
clubManagerRouter
  .route('/deleteCoreMemberById')
  .delete(checkClubManager, deleteCoreMember);
clubManagerRouter
  .route('/getAllCoreMembersByClubIndex')
  .get(checkClubManager, getAllCoreMembersByClubIndex);

// club manager Routes

clubManagerRouter
  .route('/getClubManagerByRollNo')
  .get(checkClubManager, getClubManager);
clubManagerRouter
  .route('/updateClubManagerById')
  .put(checkClubManager, updateClubManager);
clubManagerRouter
  .route('/getAllClubManagersByClubIndex')
  .get(checkClubManager, getAllClubManagersByClubIndex);

// club manager task list routes

clubManagerRouter.route('/addTask').post(checkClubManager, addTask);
clubManagerRouter.route('/getTaskById').get(checkClubManager, getTask);
clubManagerRouter.route('/updateTaskById').put(checkClubManager, updateTask);
clubManagerRouter.route('/deleteTaskById').delete(checkClubManager, deleteTask);
clubManagerRouter
  .route('/getAllTasksByClubId')
  .get(checkClubManager, getAllTasksByClubId);

// Club manager ideabox routes

clubManagerRouter.route('/addIdea').post(checkClubManager, createIdea);
clubManagerRouter.route('/getIdeaById').get(checkClubManager, getIdea);
clubManagerRouter
  .route('/getAllIdeasByClubId')
  .get(checkClubManager, getIdeasByClub);
clubManagerRouter.route('/deleteIdeaById').delete(checkClubManager, deleteIdea);

// Club manager feedback routes

clubManagerRouter.route('/getFeedbackById').get(checkClubManager, getFeedback);
clubManagerRouter
  .route('/getAllFeedbacksByClubId')
  .get(checkClubManager, getFeedbacksByClub);
clubManagerRouter
  .route('/deleteFeedbackById')
  .delete(checkClubManager, deleteFeedback);

//Club manager certifiacte routes

clubManagerRouter
  .route('/createCertificate')
  .post(checkClubManager, createCertificate);
clubManagerRouter
  .route('/getCertificateById')
  .get(checkClubManager, getCertificateById);
clubManagerRouter
  .route('/getAllCertificatesByStudentId')
  .get(checkClubManager, getCertificateByStudentId);
clubManagerRouter
  .route('/getAllCertificatesByEventId')
  .get(checkClubManager, getCertificateByEventId);
clubManagerRouter
  .route('/getAllCertificatesByClubId')
  .get(checkClubManager, getCertificateByClubId);
clubManagerRouter
  .route('/deleteCertificateById')
  .delete(checkClubManager, deleteCertificateById);
clubManagerRouter
  .route('/deleteAllCertificatesByEventId')
  .delete(checkClubManager, deleteCertificateByEventId);
clubManagerRouter
  .route('/deleteAllCertificatesByClubId')
  .delete(checkClubManager, deleteCertificateByClubId);

//Club manager Events Routes

clubManagerRouter.route('/getEventById').get(checkClubManager, getEventById);
clubManagerRouter
  .route('/getAllEventsByClubId')
  .get(checkClubManager, getEventByClubId);
clubManagerRouter.route('/getAllEvents').get(checkClubManager, getAllEvents);
clubManagerRouter.route('/createEvent').post(checkClubManager, createEvent);
clubManagerRouter.route('/update').put(checkClubManager, updateEvent);
clubManagerRouter
  .route('/registerByEventId')
  .post(checkClubManager, registration);
clubManagerRouter
  .route('/attendanceByEventId')
  .post(checkClubManager, attendance);
clubManagerRouter
  .route('/setPositionsByEventIdAndEventName')
  .post(checkClubManager, position);
clubManagerRouter
  .route('/deleteEventById')
  .delete(checkClubManager, deleteById);
clubManagerRouter
  .route('/deleteAllEventsByClubId')
  .delete(checkClubManager, deleteByClubId);

// Exports
module.exports = clubManagerRouter;
// --------------------------
