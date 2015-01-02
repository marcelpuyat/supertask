'use strict';

var app = angular.module('outlineDirectives', ['controllers']);

app.directive('taskOutline', function() {
	return {
		restrict: 'E',
		controller: 'TaskOutlineCtrl',
		scope: {
			tasks: '='
		},
		templateUrl: 'app/main/templates/taskOutline.html',
		link: function(scope, element) {
			// Needed for accordion to use effects
			$(element).find('.ui.accordion').accordion();
		}
	};
});

app.directive('superTask', function(RecursionHelper) {
	return {
		restrict: 'E',
		controller: 'SuperTaskCtrl',
		scope: {
			task: '=',
			parentTaskGroup: '='
		},
		templateUrl: 'app/main/templates/superTask.html',
		compile: function(element) {
			return RecursionHelper.compile(element, function(scope, iElement) {
				// Link fn here

				// This is because the slide effect of the accordion does strange things to the buttons if
				// they are not hidden
				var buttonSection = $(iElement).find('.button-section'),
				    titleSection = $(iElement).find('.title');
				$(iElement).find('.ui.accordion').accordion();
				$(iElement).find('.supertask-header').on('click', function() {
					if (titleSection.hasClass('active')) {
						buttonSection.hide();
					} else {
						buttonSection.show();
					}
				});
			});
		}
	};
});

app.directive('leafTask', function() {
	return {
		restrict: 'E',
		controller: 'LeafTaskController',
		scope: {
			task: '=',
			parentTaskGroup: '='
		},
		templateUrl: 'app/main/templates/leafTask.html'
	};
});