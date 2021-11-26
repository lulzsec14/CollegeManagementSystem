// Imports

const adminRouter = require("./Admin/adminRoutes");
const coreMemberRouter = require("./Core Members/coreMembersRoutes");
const clubManagerRouter = require("./Club Managers/clubManagerRoutes");
const eventsRouter = require("./Events/eventsRoutes");
const certificateRouter = require("./Certificates/certificateRoutes");
const studentRouter = require("./Students/studentsRoutes");


// ------------------------------------

// Exports
module.exports = {
  adminRouter,
  coreMemberRouter,
	clubManagerRouter,
  eventsRouter,
  certificateRouter,
  studentRouter,
};

// ------------------------------------