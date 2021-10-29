const moongose = require("mongoose");

const Schema = moongose.Schema;
//schema for new core member
const coreMemberSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Clubs",
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

//generatig model for new core member
const CoreMember = moongose.model("coremember", coreMemberSchema);

//exporting core member model
module.exports = CoreMember;
