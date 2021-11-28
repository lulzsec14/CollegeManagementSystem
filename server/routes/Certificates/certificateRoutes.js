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
certificateRouter.route("/getAllCertificatesByStudentId").get(getCertificateByStudentId);
certificateRouter.route("/getAllCertificatesByEventId").get(getCertificateByEventId);
certificateRouter.route("/getAllCertificatesByClubId").get(getCertificateByClubId);
certificateRouter.route("/deleteCertificateById").delete(deleteCertificateById);
certificateRouter.route("/deleteAllCertificatesByEventId").delete(deleteCertificateByEventId);
certificateRouter.route("/deleteAllCertificatesByClubId").delete(deleteCertificateByClubId);

// ------------------------------------

// Exports
module.exports = certificateRouter;
// ------------------------------------
