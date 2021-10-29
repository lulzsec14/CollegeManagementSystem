const moongose = require("mongoose");

const Schema = moongose.Schema;

//schema for new certificate
const certificateSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Events",
    required: true,
    unique: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
    required: true,
    unique: true,
  },
  // certificateURL: {
  //   type: String,
  //   required: true,
  // },
});

//generatig model for new certificate
const Certificate = moongose.model("Certificate", certificateSchema);

//exporting certificate model
module.exports = Certificate;
