'use strict';

angular.module('authorization', [])

.factory('Authentication', ['$http', function($http) {
	var wrapper = {};

	wrapper.login = function(username, password, correctPasswordCb, wrongPasswordCb, errorCb) {
		$http.post('/auth/login', {'username': username, 'password': password})
			.success(function(data) {
				if (data.user) {
					// Successful login
					correctPasswordCb(data.user);
				} else {
					// Unsuccessful login
					wrongPasswordCb();
				}
			})
			.error(function() {
				errorCb();
			});
	};

	wrapper.logout = function(successCallback, errorCallback) {
		$http.post('/auth/logout')
			.success(function() {
				successCallback();
			})
			.error(function() {
				errorCallback();
			});
	};

	return wrapper;
}]);