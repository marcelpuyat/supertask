'use strict';

var User = require('./user.model');

exports.get = function(req, res) {
	
}

exports.save = function(req, res) {
	var newUser = new User({username: req.body.username, password: req.body.password});
	newUser.save(function(err) {
		if (err) { return handleError(res, err); }
		return res.json(201, newUser);
	});
};

function handleError(res, err) {
  return res.send(500, err);
}