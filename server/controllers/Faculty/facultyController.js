<<<<<<< HEAD
const { getFaculty, getFacultyByID, getAllFaculty,getFacultyByClubID, insertFaculty, updateFaculty, updateFacultyByID, deleteFaculty, deleteFacultyByID } = require('../DBFunctions/facultyDAO')
exports.addFaculty = async (req, res, next) => {
    try {
        
        const data = req.body.data
        const result = await deleteFacultyByID(data)
        res.status(201).json(result)
=======
// Imports
const {
  getFaculty,
  getFacultyByID,
  getAllFaculty,
  getFacultyByClubID,
  insertFaculty,
  updateFaculty,
  updateFacultyByID,
  deleteFaculty,
  deleteFacultyByID,
} = require('../DBFunctions/facultyDBFunction');
// ------------------------------------
>>>>>>> 9e89cd67118ef6fffb63b98fd81697be56d354af

// Adding Faculty
exports.addFaculty = async (req, res, next) => {
  try {
    const data = req.body.data;
    const result = await deleteFacultyByID(data);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// ------------------------------------
