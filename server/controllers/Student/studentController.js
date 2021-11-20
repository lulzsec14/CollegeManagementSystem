const {
  registerStudents,
  loginStudent,
  getStudent,
  getStudentById,
  updateStudentArray,
  updateStudentArrayById,
  deleteFromStudentArray,
  deleteFromStudentArrayById,
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
