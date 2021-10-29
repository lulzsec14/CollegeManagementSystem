const AdminSchema = require('../../models/Admin');
const textToHash = require('../../utilities/textToHashed');
const validateCreateAdmin = require('../../Validators/CreateAdminValidator');

exports.register = async (req, res, next) => {
  const { adminId, email, name, password, phoneNo } = req.body;
  const error = validateCreateAdmin(req.body);
  if (error) {
    const { details } = error;
    return res.status(400).json({ success: false, error: details[0].message });
  }

  try {
    const findAdmin = await AdminSchema.findOne({
      email: req.body.email,
    });
    if (findAdmin)
      return res.status(400).json({
        success: false,
        error: 'Account with this email already exists!',
      });
    else {
      const hashedPassword = textToHash(password);

      const admin = await AdminSchema.create({
        adminId,
        email,
        name,
        password: hashedPassword,
        phoneNo,
      });
      await admin.save();
      res.status(201).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured while creating a user' });
  }
};
