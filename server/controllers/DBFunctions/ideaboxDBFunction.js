const Ideabox = require("../../models/Ideabox");
const validateCreateIdeabox = require('../../Validators/IdeaboxValidators');

exports.createIdea = async(data, session) => {	
	const {ideaDescription, givenBy, clubId} = data;
	try {
		const error = validateCreateIdeabox(data);
		if(error) {
			const {details} = error;
			return {
				success: false,
				code: 400,
				error: details[0].message
			}
		}
		
		const idea = await Ideabox.create([{
			ideaDescription,
			givenBy,
			clubId
		}], {session: session});

		return {
			success: true,
			code: 201,
			ideaData: idea,
			message: "Idea created successfully!"
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

exports.getIdea = async(data, session) => {
	try {
		const {ideaId} = data;
		const findIdea = await Ideabox.findById(ideaId).session(session);
		if(!findIdea) {
			return {
				success: false,
				code: 404,
				error: 'Idea does not exist!'
			}
		}
		return {
			success: true,
			code: 200,
			ideaData: findIdea,
			message: "Idea Found and returned"
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

exports.getIdeasByClub = async(data, session) => {
	try {
		const {clubId} = data;
		const findIdeas = await Ideabox.find({clubId}).session(session);
		if(!findIdeas) {
			return {
				success: false,
				code: 404,
				error: 'No Ideas found!'
			}
		}
		return {
			success: true,
			code: 200,
			ideaData: findIdeas,
			message: "Ideas found and returned"
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

exports.deleteIdea = async(data, session) => {
	try {
		const {ideaId} = data;
		const findIdea = await Ideabox.findById(ideaId).session(session)
		if(!findIdea) {
			return {
				success : false,
				code: 404,
				error: 'Idea does not exist'
			}
		}
		const deletedIdea = await Ideabox.findByIdAndDelete(ideaId).session(session);
		return {
			success: true,
			code: 200,
			ideaData: deletedIdea,
			message: "Idea deleted successfully!"
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

// exports.getIdeasByUploader = async(data) => {
// 	try {
// 		const {givenBy} = data;
// 		const findIdeas = await Ideabox.findById(givenBy);
// 		if(!findIdeas) {
// 			return {
// 				success: false,
// 				code: 204,
// 				error: 'No Ideas found!'
// 			}
// 		}
// 		return {
// 			success: true,
// 			code: 200,
// 			ideaData: findIdeas
// 		}
// 	} catch(error) {
// 		return {
// 			success: false,
// 			code: 500,
// 			error
// 		}
// 	}
// }

// exports.searchIdea = async(data) => {
// 	try {
// 		const {ideaDescription, clubId} = data;
// 		const findIdeas = await Ideabox.find({"ideaDescription": {$regex: ideaDescription, $options: 'i'}, clubId});
// 		if(findIdeas.length === 0) {
// 			return {
// 				success: false,
// 				code: 204,
// 				error: "No Ideas found!"
// 			}
// 		}
// 		return {
// 			success: true,
// 			code: 201,
// 			ideaData: findIdeas
// 		}
// 	} catch(error) {
// 		return {
// 			success: false,
// 			code: 500,
// 			error
// 		}
// 	}
// }