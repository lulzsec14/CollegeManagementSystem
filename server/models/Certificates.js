const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema for new certificate
const certificateSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    sparse: true,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Events",
    required: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
    required: true,
  },
  certificateURL: {
    type: String,
    required: true,
    createdDate: Date.now,
  },
});

//generatig model for new certificate
const Certificate = mongoose.model("Certificate", certificateSchema);

//exporting certificate model
module.exports = Certificate;
