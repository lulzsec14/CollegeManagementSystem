const Student = require('../../models/Students');
const textToHash = require('../../utilities/textToHashed');
const comparePasswords = require('../../utilities/comparePasswords');

exports.registerStudents = async (data) => {
  const { rollNo, name, email, password, semester, phoneNo } = data;
  try {
    const findStudent = await Student.findOne({ email });
    if (findStudent) {
      return {
        success: false,
        code: 405,
        error: 'Student with specified email alreadt exists!',
      };
    } else {
      const hashedPassword = textToHash(password);
      const createdStudent = await Student.create({
        rollNo,
        email,
        password: hashedPassword,
        name,
        semester,
        phoneNo,
      });
      await createdStudent.save();
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

exports.loginStudent = async (data) => {
  const { email, password } = data;
  try {
    const findStudent = await Student.findOne({ email });
    if (!findStudent) {
      return {
        success: false,
        code: 404,
        error: 'No Account registered with the mentioned email id!',
      };
    } else {
      if (comparePasswords(password, findStudent.password)) {
        return {
          success: true,
          code: 200,
          message: 'Student logged in successfully!',
          studentData: findStudent,
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
        message: 'Student with given email found found!',
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
        message: 'Student with given email found found!',
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

exports.updateStudentArray = async (data) => {
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
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $addToSet: dataToUpdate },
        { new: true }
      );
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

exports.updateStudentArrayById = async (data) => {
  const { studentId } = data;
  try {
    const findStudent = await Student.findById(studentId);
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
      );
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

exports.deleteFromStudentArray = async (data) => {
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
      const dataToUpdate = data.dataToUpdate;
      const updatedStudent = await Student.findByIdAndUpdate(
        { email },
        { $pull: dataToUpdate },
        { safe: true, multi: true, new: true }
      );
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

exports.deleteFromStudentArrayById = async (data) => {
  const { studentId } = data;
  try {
    const findStudent = await Student.findById(studentId);
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
      );
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
