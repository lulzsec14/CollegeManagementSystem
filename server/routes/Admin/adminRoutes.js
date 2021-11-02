// Imports
const express = require('express');
const adminRouter = express.Router();
// ------------------------------------

// Constants
const { register } = require('../../controllers/Admin/adminController');
const { addClub } = require('../../controllers/Clubs/clubController');
// ------------------------------------

// Api Route
adminRouter.route('/register').post(register)
adminRouter.route('/addClub').post(addClub)

// ------------------------------------

// Exports 
module.exports = adminRouter;
// ------------------------------------
