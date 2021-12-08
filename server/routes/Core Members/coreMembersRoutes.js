// Imports
const express = require('express');
const coreMemberRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const {
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
} = require('../../controllers/Core Members/coreMemberController');
const {
  getAllClubManagersByClubIndex,
} = require('../../controllers/Club Managers/clubManagerController');
const {
  getTask,
  getAllTasksByClubId,
  getAllTasksByCoreMemberId,
  updateTask,
} = require('../../controllers/Task List/taskListController');
const {
  getEventById,
  getEventByClubId,
  getAllEvents,
  updateEvent,
  attendance,
  position,
} = require('../../controllers/Events/eventController');
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
  checkCoreMember,
} = require('../../middlewares/Auth/coreMemberMiddleware');

// ------------------------------------

// club Manager club Routes
coreMemberRouter.route('/getClubByIndex').get(checkCoreMember, getClub);

// club manager core member routes
coreMemberRouter
  .route('/getCoreMemberByRollNoAndClubIndex')
  .get(checkCoreMember, getCoreMember);
coreMemberRouter
  .route('/updateCoreMemberById')
  .put(checkCoreMember, updateCoreMember);
coreMemberRouter
  .route('/getAllCoreMembersByClubIndex')
  .get(checkCoreMember, getAllCoreMembersByClubIndex);

// club manager Routes

coreMemberRouter
  .route('/getAllClubManagersByClubIndex')
  .get(checkCoreMember, getAllClubManagersByClubIndex);

// club manager task list routes

coreMemberRouter.route('/getTaskById').get(checkCoreMember, getTask);
coreMemberRouter.route('/updateTaskById').put(checkCoreMember, updateTask);
coreMemberRouter
  .route('/getAllTasksByCoreMemberId')
  .get(checkCoreMember, getAllTasksByCoreMemberId);
coreMemberRouter
  .route('/getAllTasksByClubId')
  .get(checkCoreMember, getAllTasksByClubId);

//core member event routes

coreMemberRouter.route('/getEventById').get(checkCoreMember, getEventById);
coreMemberRouter
  .route('/getAllEventsByClubId')
  .get(checkCoreMember, getEventByClubId);
coreMemberRouter.route('/getAllEvents').get(checkCoreMember, getAllEvents);
coreMemberRouter.route('/update').put(checkCoreMember, updateEvent);
coreMemberRouter
  .route('/attendanceByEventId')
  .post(checkCoreMember, attendance);
coreMemberRouter
  .route('/setPositionsByEventIdAndEventName')
  .post(checkCoreMember, position);

//core member certificate routes

coreMemberRouter
  .route('/createCertificate')
  .post(checkCoreMember, createCertificate);
coreMemberRouter
  .route('/getCertificateById')
  .get(checkCoreMember, getCertificateById);
coreMemberRouter
  .route('/getAllCertificatesByStudentId')
  .get(checkCoreMember, getCertificateByStudentId);
coreMemberRouter
  .route('/getAllCertificatesByEventId')
  .get(checkCoreMember, getCertificateByEventId);
coreMemberRouter
  .route('/getAllCertificatesByClubId')
  .get(checkCoreMember, getCertificateByClubId);
coreMemberRouter
  .route('/deleteCertificateById')
  .delete(checkCoreMember, deleteCertificateById);
coreMemberRouter
  .route('/deleteAllCertificatesByEventId')
  .delete(checkCoreMember, deleteCertificateByEventId);
coreMemberRouter
  .route('/deleteAllCertificatesByClubId')
  .delete(checkCoreMember, deleteCertificateByClubId);

// Exports
module.exports = coreMemberRouter;
// --------------------------
