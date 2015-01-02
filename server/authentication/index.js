'use strict';

var express = require('express');
var controller = require('./authentication.controller');

var router = express.Router();

router.post('/login', function(req, res, next) {
	controller.attemptLogin(req, res, next);
});

router.post('/logout', function(req, res, next) {
	controller.logout(req, res, next);
});

router.get('/login/retry', controller.retryLogin);

module.exports = router;