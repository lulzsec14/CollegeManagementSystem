const Task_List = require('../../models/Task_List');
exports.addTask = async (req, res, next) => {
    try {
        const { task_title, task_title, task_description, assigned_by, assigned_to, club_id } = req.body
        const task = new Task_List({
            
        })
        await club.save()
       // to insert in array
       // const updateClub = await Clubs.findOneAndUpdate({club_name},{ $push: { core_members: core_member_id  } })
        res.status(201).json({ success: true });

    }
    catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Server Error' });
    }
}