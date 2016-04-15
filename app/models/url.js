'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Url = new Schema(
{
	'long': { type: String, required: true },
	'short': { type: Number, required: true }
}, {
	versionKey: false 
});

module.exports = mongoose.model('Url', Url);