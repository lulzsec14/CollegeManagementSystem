const mongoose = require("mongoose");

// Imports DB functions of Certificate
const {
  createCertificate,
  getCertificateById,
  getAllCertificatesByStudentId,
  getAllCertificatesByEventId,
  getAllCertificatesByClubId,
  deleteCertificateById,
  deleteCertificateByEventId,
  deleteCertificateByClubId,
} = require("../DBFunctions/certificatesDBFunction");

// Imports DB functions of Student
const {
  updateStudentArray,
  deleteFromStudentArray,
} = require("../DBFunctions/studentDBFunction");

// Imports DB functions of Club
const {
  updateClubArrayByClubID,
  deleteFromClubArrayByID,
} = require("../DBFunctions/clubsDBFunction");

//----------------------------------------------------------------------------------------------------------------

//OK--Multiple Certificate cannot be created
exports.createCertificate = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = await createCertificate(data, session);
    if (result.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    }
    const certificateData = result.certificateData;
    const certificates = certificateData._id; //this variable is certificates as the field in student and club table are with the same name.
    const { email, clubId } = certificateData;

    //updating Student array from student db function
    const updateDataForStudent = {
      email,
      dataToUpdate: { certificates: certificates },
    };
    const result1 = await updateStudentArray(updateDataForStudent, session);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //updating Club array from club db function
    const updateDataForClub = { clubId, certificates };
    const result2 = await updateClubArrayByClubID(updateDataForClub, session);
    if (result2.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result2.code).json({
        success: result2.success,
        error: result2.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: certificateData,
    });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  session.endSession();
};

//----------------------------------------------------------------------------------------------------------------

exports.getCertificateById = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getCertificateById(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
      return;
    } else {
      const certificateData = result.certificateData;
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

exports.getCertificateByStudentId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getAllCertificatesByStudentId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    } else {
      const certificateData = result.certificateData;
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

exports.getCertificateByEventId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getAllCertificatesByEventId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    } else {
      const certificateData = result.certificateData;
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

exports.getCertificateByClubId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await getAllCertificatesByClubId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    } else {
      const certificateData = result.certificateData;
      res.status(result.code).json({
        success: result.success,
        message: result.message,
        data: certificateData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

exports.deleteCertificateById = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const data = req.body.data;
    const result = deleteCertificateById(data, session);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    }

    const deletedData = result.certificateData;
    const certificates = deletedData._id;
    const { email, clubId } = deletedData;

    // deleting from Student array by student db function
    const deleteDataForStudent = {
      email,
      dataToUpdate: { certificates: certificates },
    };
    const result1 = await deleteFromStudentArray(deleteDataForStudent);
    if (result1.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result1.code).json({
        success: result1.success,
        error: result1.error,
      });
      return;
    }

    //deleteing from Club array by club db function
    const deleteDataForClub = { clubId, certificates };
    const result2 = await deleteFromClubArrayByID(deleteDataForClub);
    if (result2.success == false) {
      await session.abortTransaction();
      session.endSession();
      res.status(result2.code).json({
        success: result2.success,
        error: result2.error,
      });
      return;
    }

    //all transactions are successfull, now commiting transaction and returning data.
    await session.commitTransaction();

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: deletedData,
    });
  } catch {
    console.log(error.message);
    await session.abortTransaction();
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
  session.endSession();
};

//---------------------------------------------HOW WE APPLY TRANSACTIONS IN LAST TWO FUNCTIONS-------------------------------------------------------------------

exports.deleteCertificateByEventId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = deleteCertificateByEventId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    }

    const deletedData = result.certificateData;

    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: deletedData,
    });
  } catch {
    console.log(error);
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------

exports.deleteCertificateByClubId = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = deleteCertificateByClubId(data);
    if (result.success == false) {
      res.status(result.code).json({
        success: result.success,
        error: result.error,
      });
    }
    const deletedData = result.certificateData;
    res.status(result.code).json({
      success: result.success,
      message: result.message,
      data: deletedData,
    });
  } catch {
    console.log(error);
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};
