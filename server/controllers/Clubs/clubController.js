const { getClub,getAllClubs,insertClub,updateClub,updateClubArray,deleteClub } = require('../DAO/clubsDAO')
exports.addClub = async (req, res, next) => {
    try {
        const data = req.body.data
        const result = await insertClub(data)
        res.status(201).json(result)

    }
    catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Server Error' });
    }
}