<<<<<<< HEAD
const { getClub,getClubByID,getAllClubs,insertClub,updateClub,updateClubByID,updateClubArray,updateClubArrayByID,deleteFromClubArray,deleteFromClubArrayByID,deleteClub,deleteClubByID } = require('../DBFunctions/clubsDAO')
exports.addClub = async (req, res, next) => {
    try {
        const data = req.body.data
        const result = await deleteFromClubArrayByID(data)
        res.status(201).json(result)
=======
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
>>>>>>> 9e89cd67118ef6fffb63b98fd81697be56d354af

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
