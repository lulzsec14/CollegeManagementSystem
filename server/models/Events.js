const moongose = require("mongoose");
// require("mongoose-type-url");

const Schema = moongose.Schema;
//schema for new Event
const eventSchema = new Schema({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
    required: true,
    unique: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
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
    type: String, //validate
    required: true,
    createdDate: Date.now,
  },
  //Not able to create more then one event, as the parameters
  //such as register, attended, positions are null and then
  //we are not able to insert duplicate values
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
        required: true,
        index: true,
        unique: true,
        sparse: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
      },
      rollNo: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
      },
      studentId: {
        type: moongose.Schema.Types.ObjectId,
        ref: "Students",
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
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
        type: moongose.Schema.Types.ObjectId,
        ref: "Students",
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
      },
      rollNo: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true,
        sparse: true,
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
const Events = moongose.model("Events", eventSchema);

//exporting Event model
module.exports = Events;
