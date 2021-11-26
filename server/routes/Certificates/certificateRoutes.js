//Imports
const express = require("express");
const certificateRouter = express.Router();
// ------------------------------------

//Constants
const {
  createCertificate,
  getCertificateById,
  getCertificateByStudentId,
  getCertificateByEventId,
  getCertificateByClubId,
  deleteCertificateById,
  deleteCertificateByEventId,
  deleteCertificateByClubId,
} = require("../../controllers/Certificates/certificateController");

// ------------------------------------

//Api Route
certificateRouter.route("/create").post(createCertificate);
certificateRouter.route("/certificate").get(getCertificateById);
certificateRouter.route("/studentCertificate").get(getCertificateByStudentId);
certificateRouter.route("/eventCertificate").get(getCertificateByEventId);
certificateRouter.route("/clubCertificate").get(getCertificateByClubId);
certificateRouter.route("/deleteCertificate").delete(deleteCertificateById);
certificateRouter.route("/deleteEventCertificate").delete(deleteCertificateByEventId);
certificateRouter.route("/deleteClubCertificate").delete(deleteCertificateByClubId);

// ------------------------------------

// Exports
module.exports = certificateRouter;
// ------------------------------------
