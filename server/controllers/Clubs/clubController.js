// Imports
const {
  getClub,
  getClubByID,
  getAllClubs,
  insertClub,
  updateClub,
  updateClubByID,
  updateClubByIndex,
  updateClubArrayByID,
  deleteFromClubArray,
  deleteFromClubArrayByID,
  deleteClubByIndex,
  deleteClubByID,
} = require('../DBFunctions/clubsDBFunction');
// ------------------------------------

// Adding Club
exports.addClub = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await insertClub(data);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// ------------------------------------
