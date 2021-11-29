// Imports

const adminRouter = require("./Admin/adminRoutes");
const coreMemberRouter = require("./Core Members/coreMembersRoutes");
const clubManagerRouter = require("./Club Managers/clubManagerRoutes");
const studentRouter = require("./Students/studentsRoutes");
const facultyRouter = require("./Faculty/facultyRoutes");


// ------------------------------------

// Exports
module.exports = {
  adminRouter,
  coreMemberRouter,
	clubManagerRouter,
  studentRouter,
  facultyRouter,
};

// ------------------------------------