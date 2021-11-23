// Imports
const {
  createRequest,
  getAllRequests,
  getRequest,
  getRequestById,
  deleteRequest,
  deleteRequestById,
  getRequestByClubId,
  getAllRequestByRoll,
} = require('../DBFunctions/requestDBFunction');
// ------------------------------------

exports.createNewRequest = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await createRequest(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveAllRequests = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getAllRequests();
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequest = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequest(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequestById = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequestById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveRequestByClubId = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getRequestByClubId(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.retrieveAllRequestByRollNo = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getAllRequestByRoll(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteOneRequest = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await deleteRequest(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteOneRequestById = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await deleteRequestById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        requestData: result.requestData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
