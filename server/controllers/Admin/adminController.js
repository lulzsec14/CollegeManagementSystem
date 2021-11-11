// Imports
const {
  registerAdmin,
  retrieveAllAdmins,
} = require('../DBFunctions/adminDBFunction');
// ------------------------------------

// Register Admin
exports.register = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await registerAdmin(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res
        .status(result.code)
        .json({ success: result.success, message: result.message });
    }
    // const resReturn = {success: result.success, resresult.}
    // res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
// ------------------------------------

// Getting all admins
exports.getAllAdmins = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await retrieveAllAdmins(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      console.log('Here');
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error occured while getting all admins!',
    });
  }
};
// ------------------------------------

// Delete an Admin
exports.deleteAdmin = async (req, res, next) => {
  const { email } = req.body;
};
// ------------------------------------
