'use strict';

angular.module('passportTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/auth/login',
        templateUrl: 'app/authentication/login.html',
        controller: 'LoginCtrl'
      });
  });