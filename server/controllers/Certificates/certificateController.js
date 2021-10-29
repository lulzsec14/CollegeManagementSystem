const certificateDB = require("../../models/Certificates");

//controller for the /api/certificate 'post' request
module.exports.certificate_post = async (req, res) => {
  //create and insert data in schema
  try {
    //initializing variables
    const { studentId } = req.body;
    const certificate = await certificateDB.create({
      studentId,
    });
    await certificate.save();
    
    //(Remove from production)
    console.log("New Certificate ID: " + certificate._id);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("certificate controller: " + err);
    res
      .status(500)
      .json({ error: "An error occured while creating certificate" });
  }
};
