// Imports
const Admin = require('../../models/Admin');
const comparePasswords = require('../../utilities/comparePasswords');
const {
  registerAdmin,
  retrieveAllAdmins,
  deleteSingleAdmin,
  updateAdminDetails,
  updateAdminPassword,
  verifyAdmin,
} = require('../DBFunctions/adminDBFunction');
const crypto = require('crypto');
const sendEmail = require('../../utilities/sendEmail');
// ------------------------------------

// Register Admin
exports.register = async (req, res, next) => {
  try {
    const data = req.body.data;
    const emailDomain = req.headers.host;
    const result = await registerAdmin(data, emailDomain);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        adminData: result.adminData,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      error: 'A server error occured while registering an Admin!',
    });
  }
};
// ------------------------------------

// Function to send the email verification link to admin
exports.sendEmailVerificationLink = async (req, res, next) => {
  const data = req.body.data;
  try {
    const { email } = data;
    const getAdmin = await Admin.findOne({ email });
    if (getAdmin.isVerified === true) {
      res
        .status(200)
        .json({ success: true, message: 'Account already verified!' });
      return;
    }

    const emailDomain = req.headers.host;
    const emailVerificationToken = crypto.randomBytes(65).toString('hex');
    const verificationUrl = `http://${emailDomain}/api/admin/verify-email/${emailVerificationToken}`;

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email },
      {
        $set: {
          emailToken: crypto
            .createHash('sha256')
            .update(emailVerificationToken)
            .digest('hex'),
          emailTokenExpire: Date.now() + 5 * (60 * 1000),
        },
      },
      { new: true }
    );
    const message = `
      <h1>Email Verification</h1>
      <p>Please go to the link or copy the link to verify your email!</p>
      <a href=${verificationUrl} clicktracking=off>Verify Email</a>
      `;

    try {
      await sendEmail({
        to: updatedAdmin.email,
        subject: 'Email Verification',
        text: message,
      });
    } catch (e) {
      updatedAdmin.emailToken = null;
      updatedAdmin.isVerified = false;
      throw e;
    }
    res
      .status(200)
      .json({ succes: true, message: 'Verification Link sent to email!' });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ------------------------------------

// Function to verify Admin email Id
exports.verifyAdmin = async (req, res, next) => {
  try {
    const result = await verifyAdmin(req, res);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(201).json({
        success: true,
        message: result.message,
        studentData: result.studentData,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ------------------------------------

// Login Admin
exports.login = async (req, res, next) => {
  const data = req.body.data;

  try {
    const { email, password } = data;

    const findAdmin = await Admin.findOne({ email });

    if (!findAdmin) {
      res.status(404).json({
        success: false,
        error: 'No admin with given email exists!',
      });
      return;
    }

    const matchPass = comparePasswords(password, findAdmin.password);

    if (!matchPass) {
      res.status(401).json({
        succes: false,
        eroor: 'Invlalid credentials',
      });
      return;
    }

    req.session.isAuth = true;
    req.session.bearerToken = process.env.ADMIN_TOKEN;

    res.status(200).json({
      succes: true,
      message: 'Admin logged in successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      error: err.message,
    });
  }
};
// ------------------------------------

// Logout Admin
exports.logOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        succes: true,
        message: 'Admin logged out successfully!',
      });
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      error: err.message,
    });
  }
};
// ------------------------------------

// Getting all admins
exports.getAllAdmins = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await retrieveAllAdmins(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
        success: true,
        message: result.message,
        adminData: result.adminData,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'A server error occured while getting all admins!',
    });
  }
};
// ------------------------------------

// Delete an Admin
exports.deleteAdmin = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await deleteSingleAdmin(data);
    if (result.success == false) {
      res
        .status(result.code)
        .json({ success: result.success, error: result.error });
    } else {
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: result.data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'A server error occured while deleting an admin!',
    });
  }
};
// ------------------------------------

// Update Admin's Phone number
exports.updateAdminDetails = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await updateAdminDetails(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: false,
        error: result.error,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: result.message,
        adminData: result.adminData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// ------------------------------------

// Update Admin's password
exports.updatePassword = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await updateAdminPassword(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(result.code).json({
        success: true,
        message: result.message,
        adminData: result.adminData,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
