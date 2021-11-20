// Imports
const {
    getClubManagerByID,
    getClubManagerByRollNo,
    getClubManagersByClubID,
    insertClubManager,
    updateClubManagerByRollNo,
    updateClubManagerByID,
    updateClubManagerArrayByRollNo,
    updateClubManagerArrayByID,
    deleteFromClubManagerArrayByID,
    deleteFromClubManagerArrayByRollNo,
    deleteClubManagerByRollNo,
    deleteClubManagerByID,
    deleteClubManagersByClubID
    
  } = require('../DBFunctions/clubManagerDBFunction');
  // ------------------------------------
  
  // Adding Club
  exports.addClubManager = async (req, res, next) => {
    try {
      const data = req.body.data;
      const result = await deleteClubManagersByClubID(data);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  // ------------------------------------
  