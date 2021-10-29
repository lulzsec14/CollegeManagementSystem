// Imports
const express = require('express');
const adminRouter = express.Router();
// ------------------------------------

// Constants
const { register } = require('../../controllers/Admin/adminController');
// ------------------------------------

// Api Route
adminRouter.route('/register').post(register);
// ------------------------------------

// Exports 
module.exports = adminRouter;
// ------------------------------------
