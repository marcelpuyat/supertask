'use strict';

angular.module('passportTestApp')
  .controller('SignupCtrl', function ($scope, $state, Signup) {
    $scope.signup = function() {
    	Signup.signup($scope.username, $scope.password,
    		function() {
    			$state.go('main');
    		},
    		function() {
    			$scope.usernameDuplicate = true;
    		}
    	);
    }
  });
