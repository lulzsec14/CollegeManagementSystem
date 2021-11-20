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
// ------------------------------------

// Api Route
studentRouter.route('/createRequest').post(createNewRequest);
studentRouter.route('/getAllRequests').get(retrieveAllRequests);
studentRouter.route('/getOneRequest').get(retrieveRequest);
studentRouter.route('/getOneRequestById').get(retrieveRequestById);
studentRouter.route('/deleteOneRequest').delete(deleteOneRequest);
studentRouter.route('/deleteOneRequestById').delete(deleteOneRequestById);
// ------------------------------------

// Exports
module.exports = studentRouter;
// ------------------------------------
