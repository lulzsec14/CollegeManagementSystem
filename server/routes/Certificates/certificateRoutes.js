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

// Certifiacte Routes
certificateRouter.route("/createCertificate").post(createCertificate);
certificateRouter.route("/getCertificateById").get(getCertificateById);
certificateRouter.route("/getCertificateByStudentId").get(getCertificateByStudentId);
certificateRouter.route("/getCertificateByEventId").get(getCertificateByEventId);
certificateRouter.route("/getCertificateByEventId").get(getCertificateByClubId);
certificateRouter.route("/deleteCertificateById").delete(deleteCertificateById);
certificateRouter.route("/deleteCertificateByEventId").delete(deleteCertificateByEventId);
certificateRouter.route("/deleteCertificateByClubId").delete(deleteCertificateByClubId);

// ------------------------------------

// Exports
module.exports = certificateRouter;
// ------------------------------------
