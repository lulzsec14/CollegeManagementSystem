<<<<<<< HEAD
=======
// Imports
const {
  getTask,
  getTaskByClubID,
  insertTask,
  updateTask,
  deleteTask,
  deleteTaskByClubID,
} = require('../DBFunctions/taskListDBFunction');
// ------------------------------------

// Adding Task
exports.addTask = async (req, res, next) => {
  try {
    let data = req.body.data;
    const result = await deleteTaskByClubID(data);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
// ------------------------------------
>>>>>>> 9e89cd67118ef6fffb63b98fd81697be56d354af
