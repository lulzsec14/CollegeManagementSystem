// Imports
const {
  getClub,
  getClubByID,
  getAllClubs,
  insertClub,
  updateClub,
  updateClubByID,
  updateClubArray,
  updateClubArrayByID,
  deleteFromClubArray,
  deleteFromClubArrayByID,
  deleteClub,
  deleteClubByID,
} = require('../DBFunctions/clubsDBFunction');
// ------------------------------------

// Adding Club
exports.addClub = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await deleteFromClubArrayByID(data);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// ------------------------------------
