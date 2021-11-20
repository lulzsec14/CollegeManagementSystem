// Imports
const express = require('express');
const adminRouter = express.Router();
// ------------------------------------

// Controller Imports
const {
  updateAdminDetails,
  register,
  getAllAdmins,
  deleteAdmin,
} = require('../../controllers/Admin/adminController');
const { addClub } = require('../../controllers/Clubs/clubController');
const { addFaculty } = require('../../controllers/Faculty/facultyController');
const { addClubManager } = require('../../controllers/Club Managers/clubManagerController');
// ------------------------------------

// Api Route
adminRouter.route('/register').post(register);
adminRouter.route('/getAllAdmins').get(getAllAdmins);
adminRouter.route('/addClub').post(addClub);
adminRouter.route('/addFaculty').post(addFaculty);
<<<<<<< HEAD
adminRouter.route('/updateAdminDetails').put(updateAdminDetails);
adminRouter.route('/deleteAdmin').delete(deleteAdmin);
=======
adminRouter.route('/addClubManager').post(addClubManager);
>>>>>>> 2eb4e426a692572ecabd6ab7640aa75d9ee357be
// ------------------------------------

// Exports
module.exports = adminRouter;
// ------------------------------------
