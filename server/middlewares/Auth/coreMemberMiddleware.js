// Constants
const CORE_MEMBER_TOKEN = process.env.CORE_MEMBER_TOKEN;
// ------------------------------------

// Middleware to authorize CoreMember
exports.checkCoreMember = (req, res, next) => {
  try {
    if (req.session.isAuth && req.session.bearerToken === CORE_MEMBER_TOKEN) {
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
