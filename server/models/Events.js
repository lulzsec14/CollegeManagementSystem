const moongose = require("mongoose");

const Schema = moongose.Schema;
//schema for new Event
const eventSchema = new Schema({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
    required: true,
    unique: true,
  },
  eventDescription: {
    type: String,
    minlength: 200,
    trim: true,
  },
  // posterURL: {
  //   type: String,
  //   required: true,
  // },
  registered: [
    {
      name: {
        type: String,
        required: [true, "Please provide a name!"],
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
      studentId: {
        type: String,
        trim: true,
        unique: true,
      },
    },
  ],
  eventTime: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventVenue: {
    type: String,
    trim: true,
  },
  attended: [
    {
      studentId: {
        type: String,
        unique: true,
        trim: true,
      },
      ispresent: {
        type: Boolean,
        required: true,
      },
      position: {
        type: String,
        trim: true,
        default: "Participant",
      },
    },
  ],
});

//generatig model for new Event
const Event = moongose.model("certificate", eventSchema);

//exporting Event model
module.exports = Event;
