// Imports
const {
  createCertificate,
  getCertificateById,
  getAllCertificatesByStudentId,
  getAllCertificatesByEventId,
  getAllCertificatesByClubId,
  deleteCertificateById,
  deleteCertificateByEventId,
  deleteCertificateByClubId,
} = require("../DBFunctions/certificatesDBFunction");
// ------------------------------------

//OK--Multiple Certificate cannot be created
exports.createCertificate = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createCertificate(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificateById = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getCertificateById(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      console.log("Here");
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificateByStudentId = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getAllCertificatesByStudentId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      console.log("Here");
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificateByEventId = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getAllCertificatesByEventId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      console.log("Here");
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCertificateByClubId = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getAllCertificatesByClubId(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      console.log("Here");
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
