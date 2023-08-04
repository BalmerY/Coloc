const Flat = require('../database/models/flat.model')

exports.getFlats = (userId) => 
{ return Flat.find({author:userId}).exec(); };

exports.getFlat = (flatId) => 
{ return Flat.findOne({ _id: flatId }).exec(); };

exports.createFlat = (flat) => 
{ const newFlat = new Flat(flat);
 return newFlat.save();
};

exports.deleteFlat = (flatId) => 
{ return Flat.findByIdAndDelete(flatId).exec(); };

exports.updateFlat =(flatId, flat) =>
{ return Flat.findByIdAndUpdate(flatId, {$set: flat}, {runValidators : true }).exec(); };