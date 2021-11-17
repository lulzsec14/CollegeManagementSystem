const Feedback = require("../../models/Feedback");
// const validateCreateFeedback = require();

exports.createFeedback = async(data) => {	
	const {feedbackBody, feedbackBy, clubId} = data;
	try {
		// const error = validateCreateFeedback(data);
		// if(error) {
		// 	const {details} = error;
		// 	return {
		// 		success: false,
		// 		code: 400,
		// 		error: details[0].message
		// 	}
		// }
		
		const feedback = await Feedback.create({
			feedbackBody,
			feedbackBy,
			clubId
		});

		const createFeedback = await feedback.save();

		return {
			success: true,
			code: 201,
			feedbackData: createFeedback
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

exports.getFeedback = async(data) => {
	try {
		const {feedbackId} = data;
		const findFeedback = await Feedback.findById(feedbackId);
		if(!findTask) {
			return {
				success: false,
				code: 204,
				error: 'Feedback does not exist!'
			}
		}
		return {
			success: true,
			code: 201,
			feedbackData: findFeedback
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.getFeedbacksByClub = async(data) => {
	try {
		const {clubId} = data;
		const findFeedbacks = await Feedback.findById(clubId);
		if(!findFeedbacks) {
			return {
				success: false,
				code: 204,
				error: 'No Feedbacks found!'
			}
		}
		return {
			success: true,
			code: 200,
			feedbackData: findFeedbacks
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.getFeedbacksByUploader = async(data) => {
	try {
		const {feedbackBy} = data;
		const findFeedbacks = await Feedback.findById(feedbackBy);
		if(!findFeedbacks) {
			return {
				success: false,
				code: 204,
				error: 'No Feedbacks found!'
			}
		}
		return {
			success: true,
			code: 200,
			feedbackData: findFeedbacks
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

exports.deleteFeedback = async(data) => {
	try {
		const {feedbackId} = data;
		const findFeedback = await Feedback.findById(feedbackId)
		if(!findFeedback) {
			return {
				success : false,
				code: 204,
				error: 'Feedback does not exist'
			}
		}
		const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
		return {
			success: true,
			code: 201,
			feedbackData: deletedFeedback
		}
	} catch(error) {
		return {
			success: false,
			code: 500,
			error
		}
	}
}

// exports.searchFeedback = async(data) => {
// 	try {
// 		const {feedbackBody, clubId} = data;
// 		const findFeedbacks = await Feedback.find({"feedbackBody": {$regex: feedbackBody, $options: 'i'}, clubId});
// 		if(findFeedbacks.length === 0) {
// 			return {
// 				success: false,
// 				code: 204,
// 				error: "No Feedbacks found!"
// 			}
// 		}
// 		return {
// 			success: true,
// 			code: 201,
// 			feedbackData: findFeedbacks
// 		}
// 	} catch(error) {
// 		return {
// 			success: false,
// 			code: 500,
// 			error
// 		}
// 	}
// }