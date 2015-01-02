'use strict';

angular.module('passportTestApp')
	.controller('LoginCtrl', ['$scope', 'Authentication', '$state', function($scope, Authentication, $state) {
		$scope.login = function() {
			Authentication.login($scope.username, $scope.password, 
				function() {
					// Success
					$state.go('main');
				},
				function() {
					// Wrong password
					$scope.wrongPassword = true;
				},
				function() {
					// Server error
				});
		};
	}]);