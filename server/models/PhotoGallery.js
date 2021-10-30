// imports
const mongoose = require('mongoose')
// -----------------------------

// Schema
const PhotoGallerySchema = new mongoose.Schema({
	photoURL: {
		type: String,
		required: [true, 'Please enter the URL of photo.'],
	},
	uploadedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the uploader.'],
	},
	clubId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

module.exports = mongoose.model('PhotoGallerySchema', PhotoGallerySchema);