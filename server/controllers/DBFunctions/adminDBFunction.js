// Imports
const Admin = require('../../models/Admin');
const textToHash = require('../../utilities/textToHashed');
const comparePasswords = require('../../utilities/comparePasswords');
// const validateCreateAdmin = require('../../Validators/AdminValidators');
const {
  validateCreateAdmin,
  validateUpdateAdmin,
  validateDeleteAdmin,
} = require('../../Validators/AdminValidators');
// ------------------------------------

// Function for registering an Admin
exports.registerAdmin = async (data) => {
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
      const admin = await Admin.create({
        email,
        name,
        password: hashedPassword,
        phoneNo,
      });
      await admin.save();
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
