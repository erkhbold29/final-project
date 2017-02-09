'use strict';
var path = require('path');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var contactSchema = new Schema({
	email: { type: String, required: true },
	phone: {type: String }}, {_id: false});

var coordsSchema = new Schema({
	coordinates: {type: [Number], required: true }, type: {type: String, default: 'Point'}
});

var myItemSchema = new Schema({
	name: {	type: String, required: true },
	description: {type: String},
	details: {type: String },
	contact: { type: contactSchema},
	category: { type: String, enum: ['offered', 'wanted']},
	state: { type: String, required: true },
	city: { type: String, required: true },
	coords: { type: coordsSchema},
	img: {type: String},
	createdAt: {type: Date },
	updatedAt: {type: Date }
});

myItemSchema.pre('save', function (next) {
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	this.updatedAt = new Date();
	next();
});

module.exports =  mongoose.model('item', myItemSchema);
