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
const {
  addClub,
  getClub,
  getAllClubs,
  updateClub,
  deleteClub,
} = require('../../controllers/Clubs/clubController');
const {
  addFaculty,
  getFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
} = require('../../controllers/Faculty/facultyController');
const {
  addClubManager,
  getClubManager,
  getAllClubManagersByClubIndex,
  updateClubManager,
  deleteClubManager,
} = require('../../controllers/Club Managers/clubManagerController');
const {
  addCoreMember,
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
  deleteCoreMember,
} = require('../../controllers/Core Members/coreMemberController');
const { checkAdmin } = require('../../middlewares/Auth/adminMiddleware');
// ------------------------------------

// Api Route
// Admin Routes

// admin club Routes
adminRouter.route('/addClub').post(checkAdmin, addClub);
adminRouter.route('/getClubByIndex').get(checkAdmin, getClub);
adminRouter.route('/updateClubById').put(checkAdmin, updateClub);
adminRouter.route('/deleteClubById').delete(checkAdmin, deleteClub);
adminRouter.route('/getAllClubs').get(checkAdmin, getAllClubs);

// admin faculty routes
adminRouter.route('/addFaculty').post(checkAdmin, addFaculty);
adminRouter.route('/getFacultyByEmail').get(checkAdmin, getFaculty);
adminRouter.route('/updateFacultyById').put(checkAdmin, updateFaculty);
adminRouter.route('/deleteFacultyById').delete(checkAdmin, deleteFaculty);
adminRouter.route('/getAllFaculty').get(checkAdmin, getAllFaculty);

// admin club manager routes
adminRouter.route('/addClubManager').post(checkAdmin, addClubManager);
adminRouter.route('/getClubManagerByRollNo').get(checkAdmin, getClubManager);
adminRouter.route('/updateClubManagerById').put(checkAdmin, updateClubManager);
adminRouter
  .route('/deleteClubManagerById')
  .delete(checkAdmin, deleteClubManager);
adminRouter
  .route('/getAllClubManagersByClubIndex')
  .get(checkAdmin, getAllClubManagersByClubIndex);

// admin core member routes
adminRouter.route('/addCoreMember').post(checkAdmin, addCoreMember);
adminRouter
  .route('/getCoreMemberByRollNoAndClubIndex')
  .get(checkAdmin, getCoreMember);
adminRouter.route('/updateCoreMemberById').put(checkAdmin, updateCoreMember);
adminRouter.route('/deleteCoreMemberById').delete(checkAdmin, deleteCoreMember);
adminRouter
  .route('/getAllCoreMembersByClubIndex')
  .get(checkAdmin, getAllCoreMembersByClubIndex);

// admin admin routes
adminRouter.route('/register').post(register);
adminRouter.route('/getAllAdmins').get(checkAdmin, getAllAdmins);
adminRouter.route('/updateAdminDetails').put(checkAdmin, updateAdminDetails);
adminRouter.route('/deleteAdmin').delete(checkAdmin, deleteAdmin);

// ------------------------------------

// Exports
module.exports = adminRouter;
// ------------------------------------
