// Imports
const express = require("express");
const clubManagerRouter = express.Router();

// controller imports

const { getClub,updateClub } = require("../../controllers/Clubs/clubController");
const {
	getClubManager,
	getAllClubManagersByClubIndex,
	updateClubManager,
} = require("../../controllers/Club Managers/clubManagerController");
const {
	addCoreMember,
	getCoreMember,
	getAllCoreMembersByClubIndex,
	updateCoreMember,
	deleteCoreMember,
} = require("../../controllers/Core Members/coreMemberController");
const {
	addTask,
	getTask,
	getAllTasksByClubId,
	updateTask,
	deleteTask,
} = require("../../controllers/Task List/taskListController");
const {
	createIdea,
	getIdea,
	getIdeasByClub,
	deleteIdea,
} = require("../../controllers/Idea Box/ideaBoxController");
const {
	getFeedback,
	getFeedbacksByClub,
	deleteFeedback,
} = require("../../controllers/Feedback/feedbackController");
const {
	createCertificate,
	getCertificateById,
	getCertificateByStudentId,
	getCertificateByEventId,
	getCertificateByClubId,
	deleteCertificateById,
	deleteCertificateByEventId,
	deleteCertificateByClubId,
} = require("../../controllers/Certificates/certificateController");
const {
	getEventById,
	createEvent,
	getEventByClubId,
	getAllEvents,
	updateEvent,
	registration,
	attendance,
	position,
	deleteById,
	deleteByClubId,
} = require("../../controllers/Events/eventController");

// ------------------------------------

// club Manager club Routes
clubManagerRouter.route("/getClubByIndex").get(getClub);
clubManagerRouter.route("/updateClubById").put(updateClub);

// club manager core member routes
clubManagerRouter.route("/addCoreMember").post(addCoreMember);
clubManagerRouter.route("/getCoreMemberByRollNoAndClubIndex").get(getCoreMember);
clubManagerRouter.route("/updateCoreMemberById").put(updateCoreMember)
clubManagerRouter.route("/deleteCoreMemberById").delete(deleteCoreMember);
clubManagerRouter.route("/getAllCoreMembersByClubIndex").get(getAllCoreMembersByClubIndex);

// club manager Routes

clubManagerRouter.route("/getClubManagerByRollNo").get(getClubManager);
clubManagerRouter.route("/updateClubManagerById").put(updateClubManager);
clubManagerRouter.route("/getAllClubManagersByClubIndex").get(getAllClubManagersByClubIndex);

// club manager task list routes

clubManagerRouter.route("/addTask").post(addTask);
clubManagerRouter.route("/getTaskById").get(getTask);
clubManagerRouter.route("/updateTaskById").put(updateTask);
clubManagerRouter.route("/deleteTaskById").delete(deleteTask);
clubManagerRouter.route("/getAllTasksByClubId").get(getAllTasksByClubId);

// Club manager ideabox routes

clubManagerRouter.route("/addIdea").post(createIdea);
clubManagerRouter.route("/getIdeaById").get(getIdea);
clubManagerRouter.route("/getAllIdeasByClubId").get(getIdeasByClub);
clubManagerRouter.route("/deleteIdeaById").delete(deleteIdea);

// Club manager feedback routes

clubManagerRouter.route("/getFeedbackById").get(getFeedback);
clubManagerRouter.route("/getAllFeedbacksByClubId").get(getFeedbacksByClub);
clubManagerRouter.route("/deleteFeedbackById").delete(deleteFeedback);

//Club manager certifiacte routes

clubManagerRouter.route("/createCertificate").post(createCertificate);
clubManagerRouter.route("/getCertificateById").get(getCertificateById);
clubManagerRouter
	.route("/getAllCertificatesByStudentId")
	.get(getCertificateByStudentId);
clubManagerRouter
	.route("/getAllCertificatesByEventId")
	.get(getCertificateByEventId);
clubManagerRouter
	.route("/getAllCertificatesByClubId")
	.get(getCertificateByClubId);
clubManagerRouter.route("/deleteCertificateById").delete(deleteCertificateById);
clubManagerRouter
	.route("/deleteAllCertificatesByEventId")
	.delete(deleteCertificateByEventId);
clubManagerRouter
	.route("/deleteAllCertificatesByClubId")
	.delete(deleteCertificateByClubId);

//Club manager Events Routes

clubManagerRouter.route("/getEventById").get(getEventById);
clubManagerRouter.route("/getAllEventsByClubId").get(getEventByClubId);
clubManagerRouter.route("/getAllEvents").get(getAllEvents);
clubManagerRouter.route("/createEvent").post(createEvent);
clubManagerRouter.route("/update").put(updateEvent);
clubManagerRouter.route("/registerByEventId").post(registration);
clubManagerRouter.route("/attendanceByEventId").post(attendance);
clubManagerRouter.route("/setPositionsByEventIdAndEventName").post(position);
clubManagerRouter.route("/deleteEventById").delete(deleteById);
clubManagerRouter.route("/deleteAllEventsByClubId").delete(deleteByClubId);

// Exports
module.exports = clubManagerRouter;
// --------------------------
