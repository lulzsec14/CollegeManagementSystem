const {
	createFeedback,
	getFeedback,
	getFeedbacksByClub,
	deleteFeedback,
} = require("../DBFunctions/feedbackDBFunction");

const {
	updateClubArrayById,
	deleteFromClubArrayById,
} = require("../DBFunctions/clubsDBFunction");

const mongoose = require("mongoose");

exports.createFeedback = async (req, res, next) => {
	const session = await mongoose.startSession();
	try {
		const data = req.body;
		session.startTransaction();

		// Saving data in Feedback collection
		const result = await createFeedback(data, session);
		console.log(result);
		if (result.success === false) {
			await session.abortTransaction();
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}

		// Saving data in Club feedback array
		const { feedbackData } = result;
		const { _id: feedback, clubId } = feedbackData[0];
		const data2 = { clubId, dataToUpdate: {feedback: feedback} };
		const result2 = await updateClubArrayById(data2, session);
		if (result2.success === false) {
			await session.abortTransaction();
			console.error(result2.error);
			res
				.status(result2.code)
				.json({ success: result2.success, error: result2.error });
			return;
		}

		// Committing transaction and returning success message
		await session.commitTransaction();
		session.endSession();
		res
			.status(result.code)
			.json({ success: result.success, message: result.message });
		return;
	} catch (error) {
		await session.endSession();
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};

exports.getFeedback = async (req, res, next) => {
	try {
		const data = req.body;
		const result = await getFeedback(data);
		if (result.success === false) {
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}
		// console.log(result.feedbackData);
		const { feedbackData } = result;
		const response = { feedbackData: feedbackData, message: result.message };
		res.status(result.code).json({ data: response });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

exports.getFeedbacksByClub = async (req, res, next) => {
	try {
		const data = req.body;
		const result = await getFeedbacksByClub(data);
		if (result.success === false) {
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}
		// console.log(result.feedbackData);
		const { feedbackData } = result;
		const response = { feedbackData: feedbackData, message: result.message };
		res.status(result.code).json({ data: response });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

exports.deleteFeedback = async (req, res, next) => {
	const session = await mongoose.startSession();
	try {
		const data = req.body;
		session.startTransaction();
		const result = await deleteFeedback(data, session);
		if (result.success === false) {
			session.abortTransaction();
			session.endSession();
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}

		const { feedbackData } = result;
		const { _id: feedback, clubId } = feedbackData;
		const data2 = { clubId, dataToUpdate: {feedback: feedback} };
		const result2 = await deleteFromClubArrayById(data2, session);
		if (result2.success === false) {
			session.abortTransaction();
			session.endSession();
			console.error(result2.error);
			res
				.status(result2.code)
				.json({ success: result2.success, error: result2.error });
			return;
		}

		await session.commitTransaction();
		session.endSession();
		res
			.status(result.code)
			.json({ success: result.success, message: result.message });
		return;
	} catch (error) {
		console.error(error);
		session.endSession();
		res.status(500).json(error);
	}
};
