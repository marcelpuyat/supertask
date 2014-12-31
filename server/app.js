/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

/* Authentication with PassportJS */
var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		User = require('./api/user/user.model');

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
      		console.log('correct');
      		return done(null, user);
      	} else {
      		console.log("wrong");
      		return done(null, false, { message: 'Incorrect password.' });
      	}
      });
    });
  }
));

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;