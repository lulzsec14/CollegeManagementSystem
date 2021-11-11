const { getFaculty, getFacultyByID, getAllFaculty,getFacultyByClubID, insertFaculty, updateFaculty, updateFacultyByID, deleteFaculty, deleteFacultyByID } = require('../DBFunctions/facultyDAO')
exports.addFaculty = async (req, res, next) => {
    try {
        
        const data = req.body.data
        const result = await deleteFacultyByID(data)
        res.status(201).json(result)

    }
    catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Server Error' });
    }
}