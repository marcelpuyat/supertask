'use strict';

var User = require('./user.model');

exports.getCurrUser = function(req, res) {
	res.json(req.user);
};

exports.save = function(req, res, next) {
	var newUser = new User({username: req.body.username, password: req.body.password, goals: '[' + getEmptyGoal() + ']'});
	newUser.save(function(err) {
		if (err) { return handleError(res, err); }
		req.logIn(newUser, function(err) {
			if (err) { return next(err); }
			return res.json(201, newUser);
		})
	});
};

exports.saveGoals = function(req, res, next) {
	var user = req.user,
			newGoals = req.body.newGoals;

	User.update({_id: user.id}, {$set: {goals: newGoals}}, function(err) {
		if (err) { next(err); }
		res.send(201);
	});
};

function getEmptyGoal() {
	return '{"name":"Welcome to SuperTask! (double-click me to edit)","tasks":[{"text":"Click me to complete!",'+
	'"completed":false,"$$hashKey":"object:96"},{"text":"Just another task","completed":false,"$$hashKey":"'+
	'object:114"},{"header":"I\'m a SuperTask! Click me to expand","contents":[{"text":"I\'m a subtask",'+
	'"completed":false,"$$hashKey":"object:127"},{"header":"I\'m a nested SuperTask!","contents":[{"text"'+
	':"SuperTask-ception!?","completed":false,"$$hashKey":"object:137"}],"$$hashKey":"object:132"}],"$$hashKey"'+
	':"object:119"},{"text":"Click the icons on the right to edit us!","completed":false,"$$hashKey":"object:145"'+
	'},{"text":"Click the + tab up top to create a new checklist","completed":false,"$$hashKey":"object:48"}],"$$hashKey":"object:76"}';
}

function handleError(res, err) {
  return res.send(500, err);
}