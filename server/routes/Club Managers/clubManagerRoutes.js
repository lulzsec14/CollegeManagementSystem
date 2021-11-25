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
clubManagerRouter.route('/getClubByIndex').get(getClub);


// club manager core member routes
clubManagerRouter.route('/addCoreMember').post(addCoreMember);
clubManagerRouter.route('/getCoreMemberByRollNo').get(getCoreMember);
clubManagerRouter.route('/deleteCoreMemberById').delete(deleteCoreMember);
clubManagerRouter.route('/getAllCoreMembersByClubId').get(getAllCoreMembers);

// club manager Routes

clubManagerRouter.route('/getClubManagerByRollNo').get(getClubManager);
clubManagerRouter.route('/updateClubManagerById').put(updateClubManager);
clubManagerRouter.route('/getAllClubManagersById').get(getAllClubManagers);

// club manager task list routes

clubManagerRouter.route('/addTask').post(addTask);
clubManagerRouter.route('/getTaskById').get(getTask);
clubManagerRouter.route('/updateTaskById').put(updateTask);
clubManagerRouter.route('/deleteTaskById').delete(deleteTask);
clubManagerRouter.route('/getAllTasksByClubId').get(getAllTasksOfClub);