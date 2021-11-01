const Ideabox = require('../../models/Ideabox');
// const catchAsync = require('../../utilities/catchAsync');
const factory = require('../DAO/dao');

exports.getIdea = factory.getOne(Ideabox);
exports.updateIdea = factory.updateOne(Ideabox);
exports.deleteIdea = factory.deleteOne(Ideabox);