const {
	createIdea,
	getIdea,
	getIdeasByClub,
	deleteIdea,
} = require("../DBFunctions/ideaboxDBFunction");

const {
	updateClubArrayById,
	deleteFromClubArrayById,
} = require("../DBFunctions/clubsDBFunction");

const mongoose = require("mongoose");

exports.createIdea = async (req, res, next) => {
	const session = await mongoose.startSession();
	try {
		const data = req.body;
		session.startTransaction();

		// Saving data in Ideabox collection
		const result = await createIdea(data, session);
		console.log(result);
		if (result.success === false) {
			await session.abortTransaction();
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}

		// Saving data in Club ideabox array
		const { ideaData } = result;
		const { _id: ideabox, clubId } = ideaData[0];
		const data2 = { clubId, dataToUpdate: {ideabox: ideabox} };
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

exports.getIdea = async (req, res, next) => {
	try {
		const data = req.body;
		const result = await getIdea(data);
		if (result.success === false) {
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}
		// console.log(result.ideaData);
		const { ideaData } = result;
		const response = { ideaData: ideaData, message: result.message };
		res.status(result.code).json({ data: response });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

exports.getIdeasByClub = async (req, res, next) => {
	try {
		const data = req.body;
		const result = await getIdeasByClub(data);
		if (result.success === false) {
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}
		// console.log(result.ideaData);
		const { ideaData } = result;
		const response = { ideaData: ideaData, message: result.message };
		res.status(result.code).json({ data: response });
		return;
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

exports.deleteIdea = async (req, res, next) => {
	const session = await mongoose.startSession();
	try {
		const data = req.body;
		session.startTransaction();
		const result = await deleteIdea(data, session);
		if (result.success === false) {
			session.abortTransaction();
			session.endSession();
			console.error(result.error);
			res
				.status(result.code)
				.json({ success: result.success, error: result.error });
			return;
		}

		const { ideaData } = result;
		const { _id: ideabox, clubId } = ideaData;
		const data2 = { clubId, dataToUpdate: {ideabox: ideabox} };
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
