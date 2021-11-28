// Imports
const express = require('express');
const coreMemberRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getCoreMember,getAllCoreMembersByClubIndex,updateCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagersByClubIndex } = require('../../controllers/Club Managers/clubManagerController');
const { getTask,getAllTasksByClubId,getAllTasksByCoreMemberId,updateTask } = require('../../controllers/Task List/taskListController');


// ------------------------------------



// core member club Routes
coreMemberRouter.route('/getClubByIndex').get(getClub);


// core member core member routes
coreMemberRouter.route('/getCoreMemberByRollNoAndClubIndex').get(getCoreMember);
coreMemberRouter.route('/updateCoreMemberById').put(updateCoreMember);
coreMemberRouter.route('/getAllCoreMembersByClubIndex').get(getAllCoreMembersByClubIndex);

// core member Routes

coreMemberRouter.route('/getAllClubManagersByClubIndex').get(getAllClubManagersByClubIndex);

// core member task list routes

coreMemberRouter.route('/getTaskById').get(getTask);
coreMemberRouter.route('/updateTaskById').put(updateTask);
coreMemberRouter.route('/getAllTasksByCoreMemberId').get(getAllTasksByCoreMemberId);
coreMemberRouter.route('/getAllTasksByClubId').get(getAllTasksByClubId);


// Exports
module.exports = coreMemberRouter;
// --------------------------