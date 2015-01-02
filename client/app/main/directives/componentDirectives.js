'use strict';

var app = angular.module('componentDirectives', []);

app.directive('editComponent', function() {
	return {
		restrict: 'E',
		scope: {
			fieldToEdit: '=',
			placeholder: '@',
			onEditCallback: '&'
		},
		templateUrl: 'app/main/templates/editComponent.html',
		link: function(scope, element) {
			var inputElem = element.find('input')[0];

			scope.shouldShowEditBar = false;
			scope.showEditBar = function() {
				scope.shouldShowEditBar = true;
				// Can't just trigger focus here because bar isn't actually rendered yet. Hence the watch.
			};

			scope.hideEditBar = function() {
				scope.shouldShowEditBar = false;
				scope.onEditCallback();
			};

			scope.$watch('shouldShowEditBar', function(newValue) {
				if (newValue) {
					inputElem.focus();
				}
			});
		}
	};
});

app.directive('addButton', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			addFn: '&',
			label: '@',
			size: '@'
		},
		templateUrl: 'app/main/templates/addButton.html',
		link: function(scope, element) {
			if (scope.label !== null) {
				scope.showLabelInsteadOfPlus = true;
			} else {
				scope.showLabelInsteadOfPlus = false;
			}

			if (scope.size !== null) {
				element.addClass(scope.size);
			}
			scope.registerClick = function() {
				scope.addFn();
			};
		}
	};
});