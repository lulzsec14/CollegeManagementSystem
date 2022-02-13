// Imports
const Student = require('../../models/Students');
const textToHash = require('../../utilities/textToHashed');
const comparePasswords = require('../../utilities/comparePasswords');
const crypto = require('crypto');
const sendEmail = require('../../utilities/sendEmail');
// ------------------------------------

// Function to register students
exports.registerStudents = async (data, emailDomain) => {
  const { rollNo, name, email, password, semester, phoneNo } = data;
  try {
    const findStudent = await Student.findOne({ email });
    if (findStudent) {
      return {
        success: false,
        code: 405,
        error: 'Student with specified email already exists!',
      };
    } else {
      const hashedPassword = textToHash(password);
      const emailVerificationToken = crypto.randomBytes(65).toString('hex');
      const isVerified = false;

      const createdStudent = await Student.create({
        rollNo,
        email,
        password: hashedPassword,
        name,
        semester,
        phoneNo,
        emailToken: crypto
          .createHash('sha256')
          .update(emailVerificationToken)
          .digest('hex'),
        emailTokenExpire: Date.now() + 5 * (60 * 1000),
        isVerified,
      });

      const verificationUrl = `http://${emailDomain}/api/student/verify-email/${emailVerificationToken}`;

      const message = `
        <h1>Email Verification</h1>
        <p>Please go to the link or copy the link to verify your email!</p>
        <a href=${verificationUrl} clicktracking=off>Verify Email</a>
      `;

      try {
        await sendEmail({
          to: createdStudent.email,
          subject: 'Email Verification',
          text: message,
        });
      } catch (e) {
        createdStudent.emailToken = null;
        createdStudent.isVerified = false;
        throw e;
      }

      return {
        success: true,
        code: 201,
        message: 'Student account registered successfully!',
        studentData: createdStudent,
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

// Function to verify Student email id
exports.verifyStudent = async (req, res) => {
  const verifyEmailToken = crypto
    .createHash('sha256')
    .update(req.params.emailToken)
    .digest('hex');

  try {
    const res = await Student.findOne({
      emailToken: verifyEmailToken,
    });

    if (!res) {
      return {
        success: false,
        code: 400,
        error: 'No such student exists!',
      };
    }

    const findStudent = await Student.findOne({
      emailToken: verifyEmailToken,
      emailTokenExpire: { $gt: Date.now() },
    });

    if (!findStudent) {
      return {
        success: false,
        code: 400,
        error: 'Token Expired!',
      };
    }

    findStudent.emailToken = null;
    findStudent.emailTokenExpire = undefined;
    findStudent.isVerified = true;

    findStudent.save();

    return {
      success: true,
      code: 200,
      message: "Student's email verified successfully!",
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

// Function to get info about a student
exports.getStudent = async (data) => {
  const { email } = data;
  try {
    const findStudent = await Student.findOne({ email });
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified email found!',
      };
    } else {
      return {
        success: true,
        code: 200,
        message: 'Student with given email found!',
        studentData: findStudent,
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

// Function to get student info by roll No
exports.getStudentByRollNo = async (data) => {
  const { rollNo } = data;
  try {
    const findStudent = await Student.findOne({ rollNo });
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified Roll no. found!',
      };
    } else {
      return {
        success: true,
        code: 200,
        message: 'Student with given Roll no found!',
        studentData: findStudent,
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

// Function to get student info by studentId
exports.getStudentById = async (data) => {
  const { studentId } = data;
  try {
    const findStudent = await Student.findById(studentId);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified student Id found!',
      };
    } else {
      return {
        success: true,
        code: 200,
        message: 'Student with given student id found!',
        studentData: findStudent,
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

// Function to update any Student field of Array type
exports.updateStudentArray = async (data, session) => {
  const { email } = data;
  try {
    const findStudent = await Student.findOne({ email }).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified email found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      // console.log(dataToUpdate);
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $addToSet: dataToUpdate },
        { new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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

// Function to update any Student field of Array type using rollNo
exports.updateStudentArrayByRollNo = async (data, session) => {
  const { rollNo } = data;
  try {
    const findStudent = await Student.findOne({ rollNo }).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified rollNo found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      // console.log(dataToUpdate);
      const updatedStudent = await Student.findOneAndUpdate(
        { rollNo },
        { $addToSet: dataToUpdate },
        { new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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

// Function to update any student field of Array type using StudentId
exports.updateStudentArrayById = async (data, session) => {
  const { studentId } = data;
  try {
    const findStudent = await Student.findById(studentId).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified email found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $addToSet: dataToUpdate },
        { new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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

// Function to delete from any field in student of Array type
exports.deleteFromStudentArray = async (data, session) => {
  const { email } = data;
  try {
    const findStudent = await Student.findOne({ email }).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified email found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $pull: dataToUpdate },
        { safe: true, multi: true, new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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

// Function to delete from any field in student of Array type using RollNo
exports.deleteFromStudentArrayByRollNo = async (data, session) => {
  const { rollNo } = data;
  try {
    const findStudent = await Student.findOne({ rollNo }).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified rollNo found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findOneAndUpdate(
        { rollNo },
        { $pull: dataToUpdate },
        { safe: true, multi: true, new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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

// Function to delete any field in Student of Array type using StudentId
exports.deleteFromStudentArrayById = async (data, session) => {
  const { studentId } = data;
  try {
    const findStudent = await Student.findById(studentId).session(session);
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No student with specified email found!',
      };
    } else {
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $pull: dataToUpdate },
        { safe: true, multi: true, new: true }
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Student Data updated successfully!',
        studentData: updatedStudent,
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
