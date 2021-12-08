const CLUB_MANAGER_TOKEN = process.env.CLUB_MANAGER_TOKEN;

exports.checkClubManager = (req, res, next) => {
  try {
    if (req.session.isAuth && req.session.bearerToken === CLUB_MANAGER_TOKEN) {
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
