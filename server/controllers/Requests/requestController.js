const Requests = require('../../models/Requests');
const factory = require('../DAO/dao');

exports.getPhoto = factory.getOne(Requests);
exports.updatePhoto = factory.updateOne(Requests);
exports.deletePhoto = factory.deleteOne(Requests);
