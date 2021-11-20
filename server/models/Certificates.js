const moongose = require("mongoose");

const Schema = moongose.Schema;

//schema for new certificate
const certificateSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    sparse: true,
    index: true,
    trim: true,
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
const Certificate = moongose.model("Certificate", certificateSchema);

//exporting certificate model
module.exports = Certificate;
