const PhotoGallery = require("../../models/PhotoGallery");
// const validateCreatePhotoGallery = require();

exports.insertPhoto = async(data) => {	
	const {photoURL, uploadedBy, clubId} = data;
	try {
		// const error = validateCreatePhotoGallery(data);
		// if(error) {
		// 	const {details} = error;
		// 	return {
		// 		success: false,
		// 		code: 400,
		// 		error: details[0].message
		// 	}
		// }
		const photo = await PhotoGallery.create({
			photoURL,
			uploadedBy,
			clubId
		});

		const createPhoto = await photo.save();

		return {
			success: true,
			code: 201,
			photoData: createPhoto
		}
	} catch(error) {
		console.error(error);
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.getPhoto = async(data) => {
	try {
		const {photoId} = data;
		const findPhoto = await PhotoGallery.findById(photoId);
		if(!findPhoto) {
			return {
				success: false,
				code: 204,
				error: 'Photo does not exist!'
			}
		}
		return {
			success: true,
			code: 201,
			photoData: findPhoto
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.getPhotosByClub = async(data) => {
	try {
		const {clubId} = data;
		const findPhotos = await PhotoGallery.findById(clubId);
		if(!findPhotos) {
			return {
				success: false,
				code: 204,
				error: 'No Photos found!'
			}
		}
		return {
			success: true,
			code: 200,
			photoData: findPhotos
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.getPhotosByUploader = async(data) => {
	try {
		const {uploadedBy} = data;
		const findPhotos = await PhotoGallery.findById(uploadedBy);
		if(!findPhotos) {
			return {
				success: false,
				code: 204,
				error: 'No Photos found!'
			}
		}
		return {
			success: true,
			code: 200,
			photoData: findPhotos
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.deletePhoto = async(data) => {
	try {
		const {photoId} = data;
		const findPhoto = await PhotoGallery.findById(photoId)
		if(!findPhoto) {
			return {
				success : false,
				code: 204,
				error: 'Photo does not exist'
			}
		}
		const deletedPhoto = await PhotoGallery.findByIdAndDelete(photoId);
		return {
			success: true,
			code: 201,
			photoData: deletedPhoto
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}
