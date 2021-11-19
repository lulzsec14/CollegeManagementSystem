// imports
const mongoose = require('mongoose'), Schema = mongoose.Schema;
// -----------------------------

// Schema
const PhotoGallerySchema = new mongoose.Schema({
	photoURL: {
		type: String,
		required: [true, 'Please enter the URL of photo.'],
	},
	uploadedBy: {
		type: Schema.Types.ObjectId,
		ref: 'Students',
		required: [true, 'Please enter student ID of the uploader.'],
	},
	clubId: {
		type: Schema.Types.ObjectId,
		ref: 'Clubs',
		required: [true, 'Please enter club ID.'],
	},
})
// -----------------------------

const PhotoGallery = mongoose.model('PhotoGallery', PhotoGallerySchema);
module.exports = PhotoGallery;