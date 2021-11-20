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
} = require('../../controllers/Student/studentController');
// ------------------------------------

// Api Route

// Request Routes
studentRouter.route('/createRequest').post(createNewRequest);
studentRouter.route('/getAllRequests').get(retrieveAllRequests);
studentRouter.route('/getOneRequest').get(retrieveRequest);
studentRouter.route('/getOneRequestById').get(retrieveRequestById);
studentRouter.route('/deleteOneRequest').delete(deleteOneRequest);
studentRouter.route('/deleteOneRequestById').delete(deleteOneRequestById);

// Student Routes
studentRouter.route('/registerStudent').post(registerStudent);
studentRouter.route('/loginStudent').post(loginSingleStudent);
studentRouter.route('/getStudentData').get(getStudentData);
studentRouter.route('/getStudentDataById').get(getStudentDataById);
studentRouter.route('/updateAnyStudentArray').put(updateAnyStudentArray);
studentRouter
  .route('/updateAnyStudentArrayById')
  .put(updateAnyStudentArrayById);
studentRouter
  .route('/deleteFromAnyStudentArray')
  .delete(deleteFromAnyStudentArray);
studentRouter
  .route('/deleteFromAnyStudentArrayById')
  .delete(deleteFromAnyStudentArrayById);
// ------------------------------------

// Exports
module.exports = studentRouter;
// ------------------------------------
