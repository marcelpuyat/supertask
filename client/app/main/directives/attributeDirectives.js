'use strict';

var app = angular.module('attributeDirectives', []);

app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

app.directive('blurOrEnter', function() {
  return {
    link: function(scope, element, attrs) {
      var callbackFnName = attrs.boeCallback;

      element.bind('focusout', function() {
        scope.$apply(callbackFnName);
      });
      element.bind('keydown', function(event) {
        if (event.which === 13) {
          scope.$apply(callbackFnName);
        }
      });
    }
  };
});