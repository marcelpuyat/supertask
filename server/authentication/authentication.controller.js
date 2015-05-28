'use strict';

var passport = require('passport');

exports.attemptLogin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({'fail': 'fail'}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({'user': user});
    });
  })(req, res, next);
}

exports.logout = function(req, res, next) {
  req.logout();
  res.send(200);
}

exports.retryLogin = function(req, res, next) {
	res.json({"text": "Try again!"});
}