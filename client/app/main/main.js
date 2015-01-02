'use strict';

angular.module('passportTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        User: 'User',
        resolve: {
        	currUserPromise: function($http) {
        		return $http({method: 'GET', url: '/api/users'});
        	}
        }
      });
  });