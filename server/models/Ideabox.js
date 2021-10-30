// imports
const mongoose = require('mongoose')
// -----------------------------

// Schema
const IdeaBoxSchema = new mongoose.Schema({
	ideaDescription: {
		type: String,
		required: [true, 'Please enter the description of idea.'],
	},
	givenBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the suggester.'],
	},
	clubId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

module.exports = mongoose.model('IdeaBoxSchema', IdeaBoxSchema);