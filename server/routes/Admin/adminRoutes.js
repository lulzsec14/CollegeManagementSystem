// Imports
const express = require('express');
const router = express.Router();
// ------------------------------------

// Constants
const { register } = require('../../controllers/Admin/adminController');
// ------------------------------------

router.route('/register').post(register);

module.exports = router;
