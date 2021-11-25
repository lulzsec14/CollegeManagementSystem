// Imports
const express = require('express');
const clubManagerRouter = express.Router();

// controller imports

const { getClub } = require('../../controllers/Clubs/clubController');
const { getClubManager,getAllClubManagers,updateClubManager } = require('../../controllers/Club Managers/clubManagerController');
const { addCoreMember,getCoreMember,getAllCoreMembers,deleteCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { addTask,getTask,getAllTasksOfClub,updateTask,deleteTask } = require('../../controllers/Task List/taskListController');

// ------------------------------------



// club Manager club Routes
clubManagerRouter.route('/club').get(getClub);


// club manager core member routes
clubManagerRouter.route('/coreMember').post(addCoreMember);
clubManagerRouter.route('/coreMember').get(getCoreMember);
clubManagerRouter.route('/coreMember').delete(deleteCoreMember);
clubManagerRouter.route('/allCoreMember').get(getAllCoreMembers);

// club manager Routes

clubManagerRouter.route('/clubManager').get(getClubManager);
clubManagerRouter.route('/clubManager').put(updateClubManager);
clubManagerRouter.route('/allClubManagers').get(getAllClubManagers);

// club manager task list routes

clubManagerRouter.route('/taskList').post(addTask);
clubManagerRouter.route('/taskList').get(getTask);
clubManagerRouter.route('/taskList').put(updateTask);
clubManagerRouter.route('/taskList').delete(deleteTask);
clubManagerRouter.route('/allTaskListClub').get(getAllTasksOfClub);