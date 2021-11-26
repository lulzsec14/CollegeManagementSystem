const Certificates = require("../../models/Certificates");

exports.createCertificate = async (data, session) => {
  try {
    const { studentId, eventId, clubId, certificateURL } = data;

    const certificate = new Certificates({
      studentId,
      email,
      eventId,
      clubId,
      certificateURL,
    });
    const certificateCreated = await certificate.save({ session });
    return {
      success: true,
      certificateData: certificateCreated,
      code: 201,
      message: "Certificate created Succesfuly!",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

exports.getCertificateById = async (data) => {
  try {
    const { certificateId } = data;

    const findCertificate = await Certificates.findById(certificateId);
    if (!findCertificate) {
      return {
        success: false,
        code: 404,
        error: "No certificate with givee Id!",
      };
    }
    return {
      success: true,
      code: 200,
      certificateData: findCertificate,
      message: "Certificate found!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//---------------------------------------------------------------------

exports.getAllCertificatesByStudentId = async (data) => {
  try {
    const { studentId } = data;

    const findCertificate = await Certificates.find({ studentId });
    if (!findCertificate) {
      return {
        success: false,
        code: 404,
        error: "Certificates does not exist for the given Candidate!",
      };
    }
    return {
      success: true,
      code: 200,
      certificateData: findCertificate,
      message: "All Certificates found for the given Candidate!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//--------------------------------------------------------------------

exports.getAllCertificatesByEventId = async (data) => {
  try {
    const { eventId } = data;

    const findCertificate = await Certificates.find({ eventId });
    if (!findCertificate) {
      return {
        success: false,
        code: 404,
        error: "Certificates does not exist for the given Event!",
      };
    }
    return {
      success: true,
      code: 200,
      certificateData: findCertificate,
      message: "All Certificates found for the given Event!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//-----------------------------------------------------------------------

exports.getAllCertificatesByClubId = async (data) => {
  try {
    const { clubId } = data;

    const findCertificate = await Certificates.find({ clubId });
    if (!findCertificate) {
      return {
        success: false,
        code: 404,
        error: "Certificates does not exist for the given Club!",
      };
    }
    return {
      success: true,
      code: 200,
      certificateData: findCertificate,
      message: "All Certificates found for the given Club!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//-----------------------------------------------------------------------

exports.deleteCertificateById = async (data, session) => {
  try {
    const { certificateId } = data;
    const findCertificate = await Certificates.findById(certificateId).session(
      session
    );
    if (!findCertificate) {
      return {
        success: false,
        error: "Certificate does not exist!",
        code: 404,
      };
    }
    const certificateDeleted = await Certificates.findByIdAndDelete(
      certificateId
    ).session(session);
    return {
      success: true,
      certificateData: certificateDeleted,
      code: 200,
      message: "certificate deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//-----------------------------------------------------------------------

exports.deleteCertificateByEventId = async (data) => {
  try {
    const { eventId } = data;
    const findEvent = await Certificates.findOne({ eventId });
    if (!findEvent) {
      return {
        success: false,
        error: "Event's certificate does not exist!",
        code: 404,
      };
    }
    const certificateDeleted = await Certificates.deleteMany({ eventId });
    return {
      success: true,
      certificateData: certificateDeleted,
      code: 200,
      message: "certificate deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};

//-----------------------------------------------------------------------

exports.deleteCertificateByClubId = async (data) => {
  try {
    const { clubId } = data;
    const findClubCertificate = await Certificates.findOne({ clubId });
    if (!findClubCertificate) {
      return {
        success: false,
        error: "Club's certificate does not exist!",
        code: 404,
      };
    }
    const certificateDeleted = await Certificates.deleteMany({ clubId });
    return {
      success: true,
      certificateData: certificateDeleted,
      code: 200,
      message: "certificate deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Server Error!",
      code: 500,
    };
  }
};
