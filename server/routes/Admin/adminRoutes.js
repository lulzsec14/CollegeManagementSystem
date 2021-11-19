// Imports
const express = require('express');
const adminRouter = express.Router();
// ------------------------------------

// Constants
const { register, getAllAdmins } = require('../../controllers/Admin/adminController');
const { addClub } = require('../../controllers/Clubs/clubController');
const { addFaculty } = require('../../controllers/Faculty/facultyController');
const { addClubManager } = require('../../controllers/Club Managers/clubManagerController');
// ------------------------------------

// Api Route
adminRouter.route('/register').post(register);
adminRouter.route('/getAllAdmins').get(getAllAdmins);
adminRouter.route('/addClub').post(addClub);
adminRouter.route('/addFaculty').post(addFaculty);
adminRouter.route('/addClubManager').post(addClubManager);
// ------------------------------------

// Exports
module.exports = adminRouter;
// ------------------------------------
