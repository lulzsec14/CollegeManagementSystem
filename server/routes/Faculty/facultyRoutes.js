// Imports
const express = require('express');
const facultyRouter = express.Router();

// controller imports

const {
  getClub,
  updateClub,
} = require('../../controllers/Clubs/clubController');
const {
  addCoreMember,
  getCoreMember,
  getAllCoreMembersByClubIndex,
  updateCoreMember,
  deleteCoreMember,
} = require('../../controllers/Core Members/coreMemberController');
const {
  getAllClubManagersByClubIndex,
} = require('../../controllers/Club Managers/clubManagerController');
const {
  addTask,
  getTask,
  getAllTasksByClubId,
  updateTask,
  deleteTask,
} = require('../../controllers/Task List/taskListController');
const {
  getFaculty,
  updateFaculty,
} = require('../../controllers/Faculty/facultyController');
const { checkFaculty } = require('../../middlewares/Auth/facultyMiddleware');

// ------------------------------------

// faculty club Routes
facultyRouter.route('/getClubByIndex').get(checkFaculty, getClub);
facultyRouter.route('/updateClubById').put(checkFaculty, updateClub);

// faculty core member routes
facultyRouter.route('/addCoreMember').post(checkFaculty, addCoreMember);
facultyRouter
  .route('/getCoreMemberByRollNoAndClubIndex')
  .get(checkFaculty, getCoreMember);
facultyRouter
  .route('/updateCoreMemberById')
  .put(checkFaculty, updateCoreMember);
facultyRouter
  .route('/deleteCoreMemberById')
  .delete(checkFaculty, deleteCoreMember);
facultyRouter
  .route('/getAllCoreMembersByClubIndex')
  .get(checkFaculty, getAllCoreMembersByClubIndex);

// faculty club manager Routes

facultyRouter
  .route('/getAllClubManagersByClubIndex')
  .get(checkFaculty, getAllClubManagersByClubIndex);

// faculty task list routes
facultyRouter.route('/addTask').post(checkFaculty, addTask);
facultyRouter.route('/getTaskById').get(checkFaculty, getTask);
facultyRouter.route('/updateTaskById').put(checkFaculty, updateTask);
facultyRouter.route('/deleteTaskById').delete(checkFaculty, deleteTask);
facultyRouter
  .route('/getAllTasksByClubId')
  .get(checkFaculty, getAllTasksByClubId);

// faculty faculty Routes
facultyRouter.route('/getFacultyByEmail').get(checkFaculty, getFaculty);
facultyRouter.route('/updateFacultyById').put(checkFaculty, updateFaculty);

// Exports
module.exports = facultyRouter;
// --------------------------
