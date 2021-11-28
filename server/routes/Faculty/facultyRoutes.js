// Imports
const express = require('express');
const facultyRouter = express.Router();

// controller imports

const { getClub,updateClub } = require('../../controllers/Clubs/clubController');
const { addCoreMember,getCoreMember,getAllCoreMembersByClubIndex,updateCoreMember,deleteCoreMember } = require('../../controllers/Core Members/coreMemberController');
const { getAllClubManagersByClubIndex } = require('../../controllers/Club Managers/clubManagerController');
const { addTask,getTask,getAllTasksByClubId,updateTask,deleteTask } = require('../../controllers/Task List/taskListController');
const { getFaculty,updateFaculty  } = require('../../controllers/Faculty/facultyController');


// ------------------------------------



// faculty club Routes
facultyRouter.route('/getClubByIndex').get(getClub);
facultyRouter.route('/updateClubById').put(updateClub);


// faculty core member routes
facultyRouter.route('/addCoreMember').post(addCoreMember);
facultyRouter.route('/getCoreMemberByRollNoAndClubIndex').get(getCoreMember);
facultyRouter.route('/updateCoreMemberById').put(updateCoreMember);
facultyRouter.route('/deleteCoreMemberById').delete(deleteCoreMember);
facultyRouter.route('/getAllCoreMembersByClubIndex').get(getAllCoreMembersByClubIndex);

// faculty club manager Routes

facultyRouter.route('/getAllClubManagersByClubIndex').get(getAllClubManagersByClubIndex);



// faculty task list routes
facultyRouter.route('/addTask').post(addTask);
facultyRouter.route('/getTaskById').get(getTask);
facultyRouter.route('/updateTaskById').put(updateTask);
facultyRouter.route('/deleteTaskById').delete(deleteTask);
facultyRouter.route('/getAllTasksByClubId').get(getAllTasksByClubId);


// faculty faculty Routes
facultyRouter.route('/getFacultyByEmail').get(getFaculty);
facultyRouter.route('/updateFacultyById').put(updateFaculty);




// Exports
module.exports = facultyRouter;
// --------------------------