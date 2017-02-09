'use strict';
var express = require('express');
var router = express.Router();
var zipCtrl = require('../controller/zip');

module.exports = function () {
    router.get('/getStates', zipCtrl.getStates);
    router.get('/getCities/:state', zipCtrl.getCities);
    return router;
};
