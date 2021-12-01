const mongoose = require('mongoose');
const {
  registerStudents,
  loginStudent,
  getStudent,
  getStudentById,
  updateStudentArray,
  updateStudentArrayById,
  deleteFromStudentArray,
  deleteFromStudentArrayById,
  updateStudentsAttendance,
} = require('../DBFunctions/studentDBFunction');

exports.registerStudent = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await registerStudents(data);
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

exports.loginSingleStudent = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await loginStudent(data);
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

exports.getStudentData = async (req, res, next) => {
  const data = req.body;
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

exports.getStudentDataById = async (req, res, next) => {
  const data = req.body;
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

exports.updateAnyStudentArray = async (req, res, next) => {
  const data = req.body;
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

exports.updateAnyStudentArrayById = async (req, res, next) => {
  const data = req.body;
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

exports.deleteFromAnyStudentArray = async (req, res, next) => {
  const data = req.body;
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

exports.deleteFromAnyStudentArrayById = async (req, res, next) => {
  const data = req.body;
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

// exports.testingAttendance = async (req, res, next) => {
//   const data = req.body;
//   const session = await mongoose.startSession();
//   try {
//     const result = await updateStudentsAttendance(data, session);

//     if (result.success == false) {
//       await session.abortTransaction();
//       await session.endSession();

//       res.status(result.code).json({ success: false, error: result.error });
//       return;
//     } else {
//       await session.commitTransaction();
//       await session.endSession();

//       res.status(200).json({
//         success: true,
//         message: result.message,
//         studentData: result.studentData,
//       });
//       return;
//     }
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();

//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// Function for updating attendance
exports.updateStudentsAttendance = async (data, session) => {
  const { emails } = data;
  try {
    // emails.forEach(async (element) => {
    //   // console.log(element);

    //   updateAttendanceData = {
    //     email: element,
    //     dataToUpdate: {
    //       eventsAttended: data.dataToUpdate.eventsAttended,
    //     },
    //   };

    //   console.log(updateAttendanceData);
    //   let result = await updateStudentArray(updateAttendanceData, session);

    //   console.log(result);

    //   if (result.success === false) {
    //     return {
    //       success: false,
    //       code: 404,
    //       error: result.error,
    //     };
    //   }
    // });

    for (const ele of emails) {
      updateAttendanceData = {
        email: ele,
        dataToUpdate: {
          eventsAttended: data.dataToUpdate.eventsAttended,
        },
      };

      console.log(updateAttendanceData);
      let result = await updateStudentArray(updateAttendanceData, session);

      console.log(result);

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
