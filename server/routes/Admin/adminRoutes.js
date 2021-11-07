// Imports
const express = require('express');
const adminRouter = express.Router();
// ------------------------------------

// Constants
const { register } = require('../../controllers/Admin/adminController');
const { addClub } = require('../../controllers/Clubs/clubController');
const { addFaculty } = require('../../controllers/Faculty/facultyController');
// ------------------------------------

// Api Route
adminRouter.route('/register').post(register)
adminRouter.route('/addClub').post(addClub)
adminRouter.route('/addFaculty').post(addFaculty)

// ------------------------------------

// Exports 
module.exports = adminRouter;
// ------------------------------------
