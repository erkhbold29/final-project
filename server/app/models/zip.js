'use strict';
var path 		 = require('path');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var myZipSchema = new Schema({
    city: {type: String, },
    loc: { type: [Number], },
    pop: {  type: Number,  },
    state: {type: String, }
});

module.exports = mongoose.model('zip', myZipSchema);
