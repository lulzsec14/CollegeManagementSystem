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
const { addClub,getClub,getAllClubs,updateClub,deleteClub } = require('../../controllers/Clubs/clubController');
const { addFaculty,getFaculty,getAllFaculty,updateFaculty,deleteFaculty  } = require('../../controllers/Faculty/facultyController');
const { addClubManager,getClubManager,getAllClubManagers,updateClubManager,deleteClubManager } = require('../../controllers/Club Managers/clubManagerController');
const { addCoreMember,getCoreMember,getAllCoreMembers,updateCoreMember,deleteCoreMember } = require('../../controllers/Core Members/coreMemberController');

// ------------------------------------

// Api Route
// Admin Routes

// admin club Routes
adminRouter.route('/club').post(addClub);
adminRouter.route('/club').get(getClub);
adminRouter.route('/club').put(updateClub);
adminRouter.route('/club').delete(deleteClub);
adminRouter.route('/allClubs').get(getAllClubs);

// admin faculty routes
adminRouter.route('/faculty').post(addFaculty);
adminRouter.route('/faculty').get(getFaculty);
adminRouter.route('/faculty').put(updateFaculty);
adminRouter.route('/faculty').delete(deleteFaculty);
adminRouter.route('/allFaculty').get(getAllFaculty);


// admin club manager routes
adminRouter.route('/clubManager').post(addClubManager);
adminRouter.route('/clubManager').get(getClubManager);
adminRouter.route('/clubManager').put(updateClubManager);
adminRouter.route('/clubManager').delete(deleteClubManager);
adminRouter.route('/allClubManagers').get(getAllClubManagers);



// admin core member routes
adminRouter.route('/coreMember').post(addCoreMember);
adminRouter.route('/coreMember').get(getCoreMember);
adminRouter.route('/coreMember').put(updateCoreMember);
adminRouter.route('/coreMember').delete(deleteCoreMember);
adminRouter.route('/allCoreMember').get(getAllCoreMembers);








// -----------------------------------------------------

adminRouter.route('/register').post(register);
adminRouter.route('/getAllAdmins').get(getAllAdmins);

adminRouter.route('/updateAdminDetails').put(updateAdminDetails);
adminRouter.route('/deleteAdmin').delete(deleteAdmin);

// ------------------------------------

// Exports
module.exports = adminRouter;
// ------------------------------------
