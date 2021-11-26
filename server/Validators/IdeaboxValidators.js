// Imports
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

// Validator function
module.exports = (data) => {
	const schema = joi.object({
		ideaDescription: joi.string().max(300).required(),
		givenBy: joi.objectId().required(),
		clubId: joi.objectId().required()
	})

	const {error} = schema.validate(data);
	return error;
}