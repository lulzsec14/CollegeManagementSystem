// Imports
const Admin = require('../../models/Admin');
const textToHash = require('../../utilities/textToHashed');
const comparePasswords = require('../../utilities/comparePasswords');
const crypto = require('crypto');
const sendEmail = require('../../utilities/sendEmail');
// const validateCreateAdmin = require('../../Validators/AdminValidators');
const {
  validateCreateAdmin,
  validateUpdateAdmin,
  validateDeleteAdmin,
} = require('../../Validators/AdminValidators');
// ------------------------------------

// Request object to be passed from controller

// Function for registering an Admin
exports.registerAdmin = async (data, emailDomain) => {
  data.email = data.email.toLowerCase();
  const { email, name, password, phoneNo } = data;
  const validationError = validateCreateAdmin(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
  try {
    const findAdmin = await Admin.findOne({ email });
    const findAdminPhone = await Admin.findOne({ phoneNo });
    if (findAdmin) {
      return {
        success: false,
        code: 400,
        error: 'Account with this email already exists!',
      };
    } else if (findAdminPhone) {
      return {
        success: false,
        code: 400,
        error: 'Account with this phoneno already exists!',
      };
    } else {
      const hashedPassword = textToHash(password);
      const emailVerificationToken = crypto.randomBytes(65).toString('hex');
      const isVerified = false;

      const admin = await Admin.create({
        email,
        name,
        password: hashedPassword,
        phoneNo,
        emailToken: crypto
          .createHash('sha256')
          .update(emailVerificationToken)
          .digest('hex'),
        emailTokenExpire: Date.now() + 5 * (60 * 1000),
        isVerified,
      });

      const verificationUrl = `http://${emailDomain}/api/admin/verify-email/${emailVerificationToken}`;

      const message = `
        <h1>Email Verification</h1>
        <p>Please go to the link or copy the link to verify your email!</p>
        <a href=${verificationUrl} clicktracking=off>Verify Email</a>
      `;

      try {
        await sendEmail({
          to: admin.email,
          subject: 'Email Verification',
          text: message,
        });
      } catch (e) {
        admin.emailToken = null;
        admin.isVerified = false;
        throw e;
      }

      return {
        success: true,
        code: 201,
        message: 'Admin account registered successfully',
        adminData: admin,
      };
    }
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      code: 500,
      error: 'An error occured while creating an admin',
    };
  }
};
// ------------------------------------

// Function to verify Admin email id
exports.verifyAdmin = async (req, res) => {
  const verifyEmailToken = crypto
    .createHash('sha256')
    .update(req.params.emailToken)
    .digest('hex');

  try {
    const res = await Admin.findOne({
      emailToken: verifyEmailToken,
    });

    if (!res) {
      return {
        success: false,
        code: 400,
        error: 'No such Admin exists!',
      };
    }

    const findAdmin = await Admin.findOne({
      emailToken: verifyEmailToken,
      emailTokenExpire: { $gt: Date.now() },
    });

    if (!findAdmin) {
      return {
        success: false,
        code: 400,
        error: 'Token Expired!',
      };
    }

    findAdmin.emailToken = null;
    findAdmin.emailTokenExpire = undefined;
    findAdmin.isVerified = true;

    findAdmin.save();

    return {
      success: true,
      code: 200,
      message: "Admin's email verified successfully!",
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to retrive all the Admins
exports.retrieveAllAdmins = async (data) => {
  try {
    const findAllAdmins = await Admin.find();
    if (!findAllAdmins) {
      return {
        success: false,
        code: 400,
        error: 'No admin accounts in the database',
      };
    } else {
      return {
        sucess: true,
        code: 201,
        message: 'Admin accounts retrieved successfully',
        adminData: findAllAdmins,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err,
    };
  }
};
// ------------------------------------

// Function to update admin details
exports.updateAdminDetails = async (data) => {
  data.email = data.email.toLowerCase();

  const validationError = validateUpdateAdmin(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }

  try {
    console.log(data);
    const { email } = data;
    const findAdmin = await Admin.findOne({ email });
    if (!findAdmin) {
      return {
        success: false,
        code: 400,
        error: 'No Admin account found with the mentioned email!',
        data: findAdmin,
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      const updatedData = await Admin.findOneAndUpdate(
        { email },
        { $set: dataToUpdate },
        { new: true }
      );
      return {
        success: true,
        code: 201,
        message: 'Admin data updated successfully!',
        adminData: updatedData,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to update Admin Password
exports.updateAdminPassword = async (data) => {
  try {
    const { oldPassword, newPassword, email } = data;
    const findAdmin = await Admin.findOne({ email });
    if (!findAdmin) {
      return {
        success: false,
        code: 404,
        error: 'No Admin with the specified email exists!',
      };
    } else {
      if (comparePasswords(oldPassword, findAdmin.password)) {
        const hashedPassword = textToHash(newPassword);
        const updatedPassword = await Admin.findOneAndUpdate(
          { email },
          { $set: { password: hashedPassword } },
          { new: true }
        );

        return {
          success: true,
          code: 200,
          message: 'Admin Password updated successfully!',
          adminData: updatedPassword,
        };
      } else {
        return {
          success: false,
          code: 401,
          error: 'Not Authorized!',
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to delete an Admin
exports.deleteSingleAdmin = async (data) => {
  const validationError = validateDeleteAdmin(data);
  if (validationError) {
    const { details } = validationError;
    return { success: false, code: 400, error: details[0].message };
  }
  try {
    const { email } = data;
    const findAdmin = await Admin.findOne({ email });
    if (!findAdmin) {
      return {
        success: false,
        code: 400,
        error: 'Admin with the mentioned email not found',
      };
    }
    const deletedAdmin = await Admin.findOneAndDelete({ email });
    return {
      sucess: true,
      code: 201,
      message: 'Admin account deleted successfully',
      data: deletedAdmin,
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err,
    };
  }
};
// ------------------------------------
