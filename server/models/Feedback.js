// imports
const mongoose = require('mongoose')
// -----------------------------

// Schema
const FeedbackSchema = new mongoose.Schema({
	feedbackBody: {
		type: String,
		required: [true, 'Please enter feedback!'],
	},
	feedbackBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the reviewer.'],
	},
	clubId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

module.exports = mongoose.model('FeedbackSchema', FeedbackSchema);