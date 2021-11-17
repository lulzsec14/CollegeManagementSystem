// imports
const mongoose = require('mongoose'), Schema = mongoose.Schema;
// -----------------------------

// Schema
const FeedbackSchema = new mongoose.Schema({
	feedbackBody: {
		type: String,
		required: [true, 'Please enter feedback!'],
	},
	feedbackBy: {
		type: Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the reviewer.'],
	},
	clubId: {
		type: Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;