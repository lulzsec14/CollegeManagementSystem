// Imports
const express = require('express');
const coreMemberRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getCoreMember,getAllCoreMembers,updateCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagers } = require('../../controllers/Club Managers/clubManagerController');
const { getTask,getAllTasksOfClub,getAllTasksOfCoreMember,updateTask } = require('../../controllers/Task List/taskListController');


// ------------------------------------



// club Manager club Routes
coreMemberRouter.route('/club').get(getClub);


// club manager core member routes
coreMemberRouter.route('/coreMember').get(getCoreMember);
coreMemberRouter.route('/coreMember').put(updateCoreMember);
coreMemberRouter.route('/allCoreMember').get(getAllCoreMembers);

// club manager Routes

coreMemberRouter.route('/allClubManagers').get(getAllClubManagers);

// club manager task list routes

coreMemberRouter.route('/taskList').get(getTask);
coreMemberRouter.route('/taskList').put(updateTask);
coreMemberRouter.route('/allTaskList').get(getAllTasksOfCoreMember);
coreMemberRouter.route('/allTaskListClub').get(getAllTasksOfClub);
