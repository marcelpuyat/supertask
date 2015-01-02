'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getCurrUser);
router.post('/', controller.save);
router.post('/goals', controller.saveGoals);

module.exports = router;