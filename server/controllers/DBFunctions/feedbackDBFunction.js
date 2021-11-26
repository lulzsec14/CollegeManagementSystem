const Feedback = require("../../models/Feedback");
const validateCreateFeedback = require('../../Validators/FeedbackValidator');

exports.createFeedback = async(data, session) => {	
	const {feedbackBody, feedbackBy, clubId} = data;
	try {
		const error = validateCreateFeedback(data);
		if(error) {
			const {details} = error;
			return {
				success: false,
				code: 400,
				error: details[0].message
			}
		}
		
		const feedback = await Feedback.create([{
			feedbackBody,
			feedbackBy,
			clubId
		}], {session: session});

		return {
			success: true,
			code: 201,
			feedbackData: feedback,
			message: "Feedback created successfully!"
		}
	} catch(error) {
		console.log(error);
		return {
			success: false,
			code: 500,
			error: "Server Error"
		}
	}
}

exports.getFeedback = async(data, session) => {
	try {
		const {feedbackId} = data;
		const findFeedback = await Feedback.findById(feedbackId).session(session);
		if(!findFeedback) {
			return {
				success: false,
				code: 404,
				error: 'Feedback does not exist!'
			}
		}
		return {
			success: true,
			code: 200,
			feedbackData: findFeedback,
			message: "Feedback found and returned"
		}
	} catch(error) {
		console.log(error)
		return {
			success: false,
			code: 500,
			error: "Server Error"
		}
	}
}

exports.getFeedbacksByClub = async(data, session) => {
	try {
		const {clubId} = data;
		const findFeedbacks = await Feedback.find({clubId}).session(session);
		if(!findFeedbacks) {
			return {
				success: false,
				code: 404,
				error: 'No Feedbacks found!'
			}
		}
		return {
			success: true,
			code: 200,
			feedbackData: findFeedbacks,
			message: "Feedbacks found and returned"
		}
	} catch(error) {
		console.log(error)
		return {
			success: false,
			code: 500,
			error: "Server Error"
		}
	}
}

exports.deleteFeedback = async(data, session) => {
	try {
		const {feedbackId} = data;
		const findFeedback = await Feedback.findById(feedbackId).session(session)
		if(!findFeedback) {
			return {
				success : false,
				code: 404,
				error: 'Feedback does not exist'
			}
		}
		const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId).session(session);
		return {
			success: true,
			code: 200,
			feedbackData: deletedFeedback,
			message: "Feedback deleted successfully!"
		}
	} catch(error) {
		console.log(error)
		return {
			success: false,
			code: 500,
			error: "Server Error"
		}
	}
}

// exports.getFeedbacksByUploader = async(data) => {
// 	try {
// 		const {feedbackBy} = data;
// 		const findFeedbacks = await Feedback.findById(feedbackBy);
// 		if(!findFeedbacks) {
// 			return {
// 				success: false,
// 				code: 204,
// 				error: 'No Feedbacks found!'
// 			}
// 		}
// 		return {
// 			success: true,
// 			code: 200,
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