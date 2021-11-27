// Imports
const express = require('express');
const coreMemberRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getCoreMember,getAllCoreMembers,updateCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagersByClubIndex } = require('../../controllers/Club Managers/clubManagerController');
const { getTask,getAllTasksOfClub,getAllTasksOfCoreMember,updateTask } = require('../../controllers/Task List/taskListController');


// ------------------------------------



// club Manager club Routes
coreMemberRouter.route('/getClubByIndex').get(getClub);


// club manager core member routes
coreMemberRouter.route('/getCoreMemberByRollNo').get(getCoreMember);
coreMemberRouter.route('/updateCoreMemberById').put(updateCoreMember);
coreMemberRouter.route('/getAllCoreMembersByClubId').get(getAllCoreMembers);

// club manager Routes

coreMemberRouter.route('/getAllClubManagersByClubIndex').get(getAllClubManagersByClubIndex);

// club manager task list routes

coreMemberRouter.route('/getTaskById').get(getTask);
coreMemberRouter.route('/updateTaskById').put(updateTask);
coreMemberRouter.route('/getAllTasksOfCoreMemberByCoreMemberId').get(getAllTasksOfCoreMember);
coreMemberRouter.route('/getAllTasksByClubId').get(getAllTasksOfClub);


// Exports
module.exports = coreMemberRouter;
// --------------------------