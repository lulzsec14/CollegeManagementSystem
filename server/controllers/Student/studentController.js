// Imports
const mongoose = require('mongoose');
const Student = require('../../models/Students');
const comparePasswords = require('../../utilities/comparePasswords');
const {
  registerStudents,
  loginStudent,
  getStudent,
  getStudentById,
  updateStudentArray,
  updateStudentArrayById,
  deleteFromStudentArray,
  deleteFromStudentArrayById,
  verifyStudent,
} = require('../DBFunctions/studentDBFunction');
const crypto = require('crypto');
const sendEmail = require('../../utilities/sendEmail');
// ------------------------------------

// Function to register a Student
exports.registerStudent = async (req, res, next) => {
  const data = req.body.data;
  const emailDomain = req.headers.host;
  try {
    const result = await registerStudents(data, emailDomain);
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

// Function to send the email verification link to admin
exports.sendEmailVerificationLink = async (req, res, next) => {
  const data = req.body.data;
  try {
    const { email } = data;
    const getStudent = await Student.findOne({ email });
    // Student.findById()
    if (getStudent.isVerified === true) {
      res
        .status(200)
        .json({ success: true, message: 'Account already verified!' });
      return;
    }

    const emailDomain = req.headers.host;
    const emailVerificationToken = crypto.randomBytes(65).toString('hex');
    const verificationUrl = `http://${emailDomain}/api/student/verify-email/${emailVerificationToken}`;

    const updatedStudent = await Student.findOneAndUpdate(
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
        to: updatedStudent.email,
        subject: 'Email Verification',
        text: message,
      });
    } catch (e) {
      updatedStudent.emailToken = null;
      updatedStudent.isVerified = false;
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

// Function to verify a Students email id
exports.verifySingleStudent = async (req, res, next) => {
  try {
    const result = await verifyStudent(req, res);
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

// Function to login Student
exports.loginSingleStudent = async (req, res, next) => {
  const data = req.body.data;
  try {
    const { email, password } = data;

    const findStudent = await Student.findOne({ email });

    if (!findStudent) {
      res.status(404).json({
        success: false,
        error: 'No student with given email exists!',
      });
      return;
    }

    const matchPass = comparePasswords(password, findStudent.password);

    if (!matchPass) {
      res.status(401).json({
        success: false,
        eroor: 'Invlalid credentials',
      });
      return;
    }

    req.session.isAuth = true;
    req.session.bearerToken = process.env.STUDENT_TOKEN;

    res.status(200).json({
      succes: true,
      message: 'Student logged in successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ------------------------------------

// Function to logout a Student
exports.logoutSingleStudent = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        succes: true,
        message: 'Student logged out successfully!',
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ------------------------------------

// Function to get student info using email
exports.getStudentData = async (req, res, next) => {
  // const data = req.body.data;
  const data = req.query;
  try {
    const result = await getStudent(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function to get student info using student Id
exports.getStudentDataById = async (req, res, next) => {
  // const data = req.body.data;
  const data = req.query;
  try {
    const result = await getStudentById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function to update any field in student of Array type
exports.updateAnyStudentArray = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await updateStudentArray(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function to update any field in student of Array type
exports.updateAnyStudentArrayById = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await updateStudentArrayById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function to delete any field in Student of Array type
exports.deleteFromAnyStudentArray = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await deleteFromStudentArray(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function for deleting any field from Student of Array type
exports.deleteFromAnyStudentArrayById = async (req, res, next) => {
  const data = req.body.data;
  try {
    const result = await deleteFromStudentArrayById(data);
    if (result.success == false) {
      res.status(result.code).json({ success: false, error: result.error });
    } else {
      res.status(200).json({
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

// Function for updating attendance
exports.updateStudentsAttendance = async (data, session) => {
  const { emails } = data;
  try {
    for (const ele of emails) {
      updateAttendanceData = {
        email: ele,
        dataToUpdate: {
          eventsAttended: data.dataToUpdate.eventsAttended,
        },
      };

      // console.log(updateAttendanceData);
      let result = await updateStudentArray(updateAttendanceData, session);

      // console.log(result);

      if (result.success === false) {
        return {
          success: false,
          code: 404,
          error: result.error,
        };
      }
    }

    return {
      success: true,
      code: 200,
      message: 'Attendance marked successfully!',
      studentData: {},
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
