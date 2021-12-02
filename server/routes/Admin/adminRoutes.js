// Imports
const express = require("express");
const adminRouter = express.Router();
// ------------------------------------

// Controller Imports
const {
	updateAdminDetails,
	register,
	getAllAdmins,
	deleteAdmin,
} = require("../../controllers/Admin/adminController");
const {
	addClub,
	getClub,
	getAllClubs,
	updateClub,
	deleteClub,
} = require("../../controllers/Clubs/clubController");
const {
	addFaculty,
	getFaculty,
	getAllFaculty,
	updateFaculty,
	deleteFaculty,
} = require("../../controllers/Faculty/facultyController");
const {
	addClubManager,
	getClubManager,
	getAllClubManagersByClubIndex,
	updateClubManager,
	deleteClubManager,
} = require("../../controllers/Club Managers/clubManagerController");
const {
	addCoreMember,
	getCoreMember,
	getAllCoreMembersByClubIndex,
	updateCoreMember,
	deleteCoreMember,
} = require("../../controllers/Core Members/coreMemberController");

// ------------------------------------

// Api Route
// Admin Routes

// admin club Routes
adminRouter.route("/addClub").post(addClub);
adminRouter.route("/getClubByIndex").get(getClub);
adminRouter.route("/updateClubById").put(updateClub);
adminRouter.route("/deleteClubById").delete(deleteClub);
adminRouter.route("/getAllClubs").get(getAllClubs);

// admin faculty routes
adminRouter.route("/addFaculty").post(addFaculty);
adminRouter.route("/getFacultyByEmail").get(getFaculty);
adminRouter.route("/updateFacultyById").put(updateFaculty);
adminRouter.route("/deleteFacultyById").delete(deleteFaculty);
adminRouter.route("/getAllFaculty").get(getAllFaculty);

// admin club manager routes
adminRouter.route("/addClubManager").post(addClubManager);
adminRouter.route("/getClubManagerByRollNo").get(getClubManager);
adminRouter.route("/updateClubManagerById").put(updateClubManager);
adminRouter.route("/deleteClubManagerById").delete(deleteClubManager);
adminRouter.route("/getAllClubManagersByClubIndex").get(getAllClubManagersByClubIndex);

// admin core member routes
adminRouter.route("/addCoreMember").post(addCoreMember);
adminRouter.route("/getCoreMemberByRollNoAndClubIndex").get(getCoreMember);
adminRouter.route("/updateCoreMemberById").put(updateCoreMember);
adminRouter.route("/deleteCoreMemberById").delete(deleteCoreMember);
adminRouter.route("/getAllCoreMembersByClubIndex").get(getAllCoreMembersByClubIndex);

// admin admin routes
adminRouter.route("/register").post(register);
adminRouter.route("/getAllAdmins").get(getAllAdmins);
adminRouter.route("/updateAdminDetails").put(updateAdminDetails);
adminRouter.route("/deleteAdmin").delete(deleteAdmin);

// ------------------------------------

// Exports
module.exports = adminRouter;
// ------------------------------------
