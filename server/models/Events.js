const mongoose = require("mongoose");
require("mongoose-type-url");

const Schema = mongoose.Schema;
//schema for new Event
const eventSchema = new Schema({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  eventName: {
    type: String,
    trim: true,
    required: [true, "Please provide an Event Name!"],
  },
  eventDescription: {
    type: String,
    minlength: 200,
    trim: true,
    required: [
      true,
      "Please provide an Event Description of atleast 200 words!",
    ],
  },
  posterURL: {
    type: String,
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    required: [true, "Please upload an Event Poster!"],
    createdDate: Date.now,
  },
  registered: [
    {
      name: {
        type: String,
        required: [true, "Please provide candidate's name!"],
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email!",
        ],
      },
      rollNo: {
        type: String,
        trim: true,
        required: [true, "Please provide a valid Roll number!"],
      },
    },
  ],
  eventTime: {
    type: String,
    required: [true, "Please provide a valid Event Time!"],
    trim: true,
  },
  eventDate: {
    type: Date,
    required: [true, "Please Provide a valid Event Date!"],
  },
  eventVenue: {
    type: String,
    trim: true,
  },
  deadlineTime: {
    type: String,
    required: [true, "Please provide a valid Event deadline time!"],
    trim: true,
    default: {
      type: Object,
      ref: "Events",
      field: "eventTime",
    },
  },
  attended: [
    {
      rollNo: {
        type: String,
        trim: true,
        required: [true, "Please provide attendee's valid roll number!"],
      },
      email: {
        type: String,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
      ispresent: {
        type: Boolean,
        default: false,
        required: [true, "Please select an option!"],
      },
    },
  ],
  position: [
    {
      first: [
        {
          type: String,
          ref: "Students",
          field: "rollNo",
          trim: true,
        },
      ],

      second: [
        {
          type: String,
          ref: "Students",
          field: "rollNo",
          trim: true,
        },
      ],

      third: [
        {
          type: String,
          ref: "Students",
          field: "rollNo",
          trim: true,
        },
      ],
    },
  ],
});

//generatig model for new Event
const Events = mongoose.model("Events", eventSchema);

//exporting Event model
module.exports = Events;
