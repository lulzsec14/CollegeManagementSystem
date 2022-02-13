// Imports
const express = require('express');
const studentRouter = express.Router();
// ------------------------------------

// Controller Imports
const {
  createNewRequest,
  retrieveAllRequests,
  retrieveRequest,
  retrieveRequestById,
  deleteOneRequest,
  deleteOneRequestById,
  retrieveRequestByClubId,
  retrieveAllRequestByRollNo,
} = require('../../controllers/Requests/requestController');
const {
  registerStudent,
  loginSingleStudent,
  getStudentData,
  getStudentDataById,
  updateAnyStudentArray,
  updateAnyStudentArrayById,
  deleteFromAnyStudentArray,
  deleteFromAnyStudentArrayById,
  logoutSingleStudent,
  verifySingleStudent,
  sendEmailVerificationLink,
} = require('../../controllers/Student/studentController');

const {
  createFeedback,
  getFeedback,
  deleteFeedback,
} = require('../../controllers/Feedback/feedbackController');

const { registration } = require('../../controllers/Events/eventController');

const { checkStudent } = require('../../middlewares/Auth/studentMiddleware');
// ------------------------------------

// Api Route

// Request Routes
studentRouter.route('/createRequest').post(checkStudent, createNewRequest);
studentRouter.route('/getAllRequests').get(checkStudent, retrieveAllRequests);
studentRouter.route('/getOneRequest').get(checkStudent, retrieveRequest);
studentRouter
  .route('/getOneRequestById')
  .get(checkStudent, retrieveRequestById);
studentRouter
  .route('/getRequestByClubId')
  .get(checkStudent, retrieveRequestByClubId);
studentRouter
  .route('/getAllRequestByRollNo')
  .get(checkStudent, retrieveAllRequestByRollNo);
studentRouter.route('/deleteOneRequest').delete(checkStudent, deleteOneRequest);
// studentRouter.route('/deleteOneRequestById').delete(deleteOneRequestById);

// Student Routes
studentRouter.route('/registerStudent').post(registerStudent);
studentRouter.route('/verify-email/:emailToken').get(verifySingleStudent);
studentRouter.route('/loginStudent').post(loginSingleStudent);
studentRouter.route('/logoutStudent').delete(checkStudent, logoutSingleStudent);
studentRouter.route('/getStudentData').get(checkStudent, getStudentData);
studentRouter
  .route('/getStudentDataById')
  .get(checkStudent, getStudentDataById);
studentRouter
  .route('/updateStudentArray')
  .put(checkStudent, updateAnyStudentArray);
studentRouter
  .route('/updateStudentArrayById')
  .put(checkStudent, updateAnyStudentArrayById);
studentRouter
  .route('/deleteStudentArray')
  .delete(checkStudent, deleteFromAnyStudentArray);
studentRouter
  .route('/deleteStudentArrayById')
  .delete(checkStudent, deleteFromAnyStudentArrayById);

// studentRouter.route('/testAttendance').post(testingAttendance);

// Feedback Router
studentRouter.route('/addFeedback').post(checkStudent, createFeedback);
studentRouter.route('/getFeedbackById').get(checkStudent, getFeedback);
studentRouter.route('/deleteFeedbackById').delete(checkStudent, deleteFeedback);
studentRouter.route('/emailVerification').post(sendEmailVerificationLink);
// ------------------------------------

// Event Routes
studentRouter.route('/registerEvent').post(checkStudent, registration);
// ------------------------------------

// Exports
module.exports = studentRouter;
// ------------------------------------
