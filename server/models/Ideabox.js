// imports
const mongoose = require('mongoose'), Schema = mongoose.Schema
// -----------------------------

// Schema
const IdeaBoxSchema = new mongoose.Schema({
	ideaDescription: {
		type: String,
		required: [true, 'Please enter the description of idea.'],
	},
	givenBy: {
		type: Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the suggester.'],
	},
	clubId: {
		type: Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

const Ideabox = mongoose.model('Ideabox', IdeaBoxSchema);
module.exports = Ideabox;