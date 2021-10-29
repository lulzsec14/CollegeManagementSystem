const { Router } = require("express");
const router = Router();

//Controller methods
const eventController = require("../../controllers/Events/eventController");

//Api Routes
router.post("/api/events", eventController.event_post);

//Export router
module.exports = router;

/*************************************************************/
