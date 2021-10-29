const CoreMemberDB = require("../../models/Core_members");
const validateCoreMember = require("../../Validators/CoreMemberValidator");

//controller for the /api/coremember 'post' request
module.exports.coreMember_post = async (req, res) => {
  //initializing variables
  const { id, role } = req.body;
  //validate data
  const error = validateCoreMember(req.body);
  //if validation give error
  if (error) {
    const { details } = error;
    return res.status(400).json({ success: false, error: details[0].message });
  }

  //data validated, insert in schema
  try {
    //finding if member already exists
    const findMember = await CoreMemberDB.findOne({ studentId: id });
    if (findMember) {
      return res.status(400).json({
        success: false,
        error: "Member with this ID already exists!",
      });
    } 
    //if not exist try to insert data in schema
    else {
      const coreMember = await CoreMemberDB.create({
        studentId: id,
        role,
      });
      await coreMember.save();
      //(reomve from production)
      console.log("New CoreMember ID: " + coreMember._id);

      res.status(201).json({ success: true });
    }
  } catch (err) {
    console.error("coremember controller: " + err);
    res.status(500).json({ error: "An error occured while creating a member" });
  }
};
