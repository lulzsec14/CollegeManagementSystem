const mongoose = require("mongoose");
require("mongoose-type-url");

const Schema = mongoose.Schema;
//schema for new Event
const eventSchema = new Schema({
  isPrivate: {
    type: Boolean,
    default: false,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
  },
  eventName: {
    type: String,
    trim: true,
    required: true,
  },
  eventDescription: {
    type: String,
    minlength: 200,
    trim: true,
    required: true,
  },
  posterURL: {
    type: String,
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    required: true,
    createdDate: Date.now,
  },
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
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
      rollNo: {
        type: String,
        trim: true,
        required: [true, "Please provide a Roll number!"],
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
        trim: true,
        required: [true, "Please provide studentID!"],
      },
    },
  ],
  eventTime: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventVenue: {
    type: String,
    trim: true,
  },
  deadlineTime: {
    type: String,
    required: true,
    trim: true,
    default: {
      type: Object,
      ref: "Events",
      field: "eventTime",
    },
  },
  attended: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
        trim: true,
        required: true,
      },
      rollNo: {
        type: String,
        trim: true,
        required: true,
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
        required: true,
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
