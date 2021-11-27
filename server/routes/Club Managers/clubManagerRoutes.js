// Imports
const express = require('express');
const clubManagerRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getClubManager,getAllClubManagersByClubIndex,updateClubManager } = require('../../controllers/Club Managers/clubManagerController');
const { addCoreMember,getCoreMember,getAllCoreMembersByClubIndex,deleteCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { addTask,getTask,getAllTasksOfClub,updateTask,deleteTask } = require('../../controllers/Task List/taskListController');
const { createIdea, getIdea, getIdeasByClub, deleteIdea } = require("../../controllers/Idea Box/ideaBoxController");
const { getFeedback, getFeedbacksByClub, deleteFeedback } = require("../../controllers/Feedback/feedbackController");

// ------------------------------------



// club Manager club Routes
clubManagerRouter.route('/getClubByIndex').get(getClub);


// club manager core member routes
clubManagerRouter.route('/addCoreMember').post(addCoreMember);
clubManagerRouter.route('/getCoreMemberByRollNo').get(getCoreMember);
clubManagerRouter.route('/deleteCoreMemberById').delete(deleteCoreMember);
clubManagerRouter.route('/getAllCoreMembersByClubIndex').get(getAllCoreMembersByClubIndex);

// club manager Routes

clubManagerRouter.route('/getClubManagerByRollNo').get(getClubManager);
clubManagerRouter.route('/updateClubManagerById').put(updateClubManager);
clubManagerRouter.route('/getAllClubManagersByClubIndex').get(getAllClubManagersByClubIndex);

// club manager task list routes

clubManagerRouter.route('/addTask').post(addTask);
clubManagerRouter.route('/getTaskById').get(getTask);
clubManagerRouter.route('/updateTaskById').put(updateTask);
clubManagerRouter.route('/deleteTaskById').delete(deleteTask);
clubManagerRouter.route('/getAllTasksByClubId').get(getAllTasksOfClub);

// Exports
module.exports = clubManagerRouter;
// --------------------------