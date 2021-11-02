// Imports
const express = require('express');
const coreMemberRouter = express.Router();
// ------------------------------------

// Constants
const { addTask } = require('../../controllers/Task List/taskListController')
// ------------------------------------

// Api Route
coreMemberRouter.route('/addTask').post(addTask)

// ------------------------------------

// Exports 
module.exports = coreMemberRouter
// ------------------------------------
