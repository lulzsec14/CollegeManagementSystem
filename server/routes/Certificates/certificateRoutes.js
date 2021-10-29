const { Router } = require("express");
const router = Router();

//Controller methods
const certificateController = require("../../controllers/Certificates/certificateController");

//Api Routes
router.post("/api/certificates", certificateController.certificate_post);

//Export router
module.exports = router;

/*************************************************************/