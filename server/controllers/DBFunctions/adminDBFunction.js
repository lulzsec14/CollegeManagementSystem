const Admin = require('../../models/Admin');
const textToHash = require('../../utilities/textToHashed');
const validateCreateAdmin = require('../../Validators/AdminValidators');

exports.registerAdmin = async (data) => {
  const { email, name, password, phoneNo } = data;
  const error = validateCreateAdmin(data);
  if (error) {
    const { details } = error;
    return { success: false, code: 400, error: details[0].message };
    // res.status(400).json({ success: false, error: details[0].message });
  }

  try {
    const findAdmin = await Admin.findOne({
      email: data.email,
    });
    if (findAdmin) {
      return {
        success: false,
        code: 400,
        error: 'Account with this email already exists!',
      };
      // res.status(400).json({
      //   success: false,
      //   error: 'Account with this email already exists!',
      // });
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
      };
      // res.status(201).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      code: 500,
      error: 'An error occured while creating a user',
    };
    // res.status(500).json({
    //   success: false,
    //   error: 'An error occured while creating a user',
    // });
  }
};

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
        data: findAllAdmins,
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
