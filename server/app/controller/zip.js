'use strict';
var Zip = require('../models/zip');

module.exports = {
	    getCities: function (req, res, next) {
		let cState = req.params.state || req.query.state;

        Zip.find({ state: cState })
            .select('city')
            .then(function (data) {
                res.json({
                    success: 1,
                    cities: data  });
            })
            .catch(function (err) { return next(err); });
    },	
    getStates: function (req, res, next) {

        Zip.aggregate([
            { '$group': { '_id': { state: '$state' } } },
            { '$sort': { '_id.state': 1 } },
            { '$project': { state: '$_id.state', '_id': 0 } }
        ]
        ).then(function (data) {
            res.json({
                success: 1,
                states: data
            });
        })
            .catch(function (err) {  return next(err); });
    }};