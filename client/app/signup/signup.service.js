'use strict';

angular.module('passportTestApp')

.factory('Signup', ['$http', '$state', function($http, $state) {
	var wrapper = {};

	wrapper.signup = function(username, password, successCallback, errorCallback) {
		$http.post('/api/users', {'username': username, 'password': password})
			.success(function() {
				successCallback();
			})
			.error(function() {
				errorCallback();
			});
	};

	return wrapper;
}]);