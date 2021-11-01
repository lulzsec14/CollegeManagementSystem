const PhotoGallery = require('../../models/PhotoGallery');
const factory = require('../DAO/dao');

exports.getPhoto = factory.getOne(PhotoGallery);
exports.updatePhoto = factory.updateOne(PhotoGallery);
exports.deletePhoto = factory.deleteOne(PhotoGallery);
