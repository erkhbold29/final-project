'use strict';
var express = require('express');
var router = express.Router();

var userController = require('../controller/user');

module.exports = function() {
	router.get('/', userController.get);
	router.post('/', userController.save);
	router.get('/:id', userController.getById);
	//router.put('/:id', authCheck, ItemCtrl.save);
	//router.delete('/:id', authCheck, ItemCtrl.delete);
	return router;
};
