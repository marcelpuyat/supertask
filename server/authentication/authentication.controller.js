'use strict';

var passport = require('passport');

exports.attemptLogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login/retry'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/home');
    });
  })(req, res, next);
}

exports.retryLogin = function(req, res, next) {
	res.json({"text": "Try again!"});
}