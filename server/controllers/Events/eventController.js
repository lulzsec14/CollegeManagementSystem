const EventDB = require("../../models/Events");
const validateEvent = require("../../Validators/EventValidator");

//controller for the /api/events 'post' request
module.exports.event_post = async (req, res) => {
  //initializing variables
  const data = req.body;
  const {eventDescription, registeredObj, eventTime, eventDate, eventVenue, attendedObj} = data;
  const error = validateEvent(data);

  //if not able to validate
  if (error) {
    const { details } = error;
    return res.status(400).json({ success: false, error: details[0].message });
  }

  //data validated, create and insert in the schema
  try {
    const event = await EventDB.create({
      eventDescription,
      registered: {
        name: registeredObj.name,
        email: registeredObj.email,
        studentId: registeredObj.studentId
      },
      eventTime,
      eventDate,
      eventVenue,
      attended: {
        studentId: attendedObj.studentId,
        ispresent: attendedObj.ispresent,
        position: attendedObj.ispresent
      }
    });
    await event.save();

    //(Remove from production)
    console.log("New Event ID: " + event._id);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("event controller err: " + err);
    res
      .status(500)
      .json({ error: "An error occured while scheduling an event" });
  }
};
