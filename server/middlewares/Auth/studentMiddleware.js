// Constants
const STUDENT_TOKEN = process.env.STUDENT_TOKEN;
// ------------------------------------

// Middleware to authorize Student
exports.checkStudent = (req, res, next) => {
  try {
    if (req.session.isAuth && req.session.bearerToken === STUDENT_TOKEN) {
      next();
    } else {
      res.status(400).json({
        success: false,
        error: 'User not authorized!',
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};
// ------------------------------------
