const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

exports.checkAdmin = (req, res, next) => {
  try {
    if (req.session.isAuth && req.session.bearerToken === ADMIN_TOKEN) {
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
