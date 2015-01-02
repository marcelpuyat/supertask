var passport = require('passport'),
		User = require('../api/user/user.model'),
		LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.validPassword(password, function(err, isMatch) {
      	if (err) { return done(err); }
      	if (isMatch) {
      		return done(null, user);
      	} else {
      		return done(null, false, { message: 'Incorrect password.' });
      	}
      });
    });
  }
));

exports.configureSerialization = function() {
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
};