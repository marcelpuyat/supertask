'use strict';

var express = require('express');
var controller = require('./authentication.controller');

var router = express.Router();

router.post('/', controller.attemptLogin);
router.get('/retry', controller.retryLogin);
router.post('/retry', controller.retryLogin);

module.exports = router;