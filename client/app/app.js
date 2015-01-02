'use strict';

angular.module('passportTestApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'authorization',
  'attributeDirectives',
  'componentDirectives',
  'outlineDirectives',
  'controllers',
  'services',
  'RecursionHelper'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });