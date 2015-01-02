'use strict';

var app = angular.module('controllers', ['services']);

app.controller('TaskOutlineCtrl', ['$scope', 'Tasks', 'Goals', function($scope, Tasks) {
	$scope.addSuperTask = Tasks.addSuperTask;
	$scope.addTask = Tasks.addTask;
	$scope.isSuperTask = Tasks.isSuperTask;
}]);

app.controller('SuperTaskCtrl', ['$scope', 'Tasks', function($scope, Tasks) {
	$scope.addTask = Tasks.addTask;
	$scope.addSuperTask = Tasks.addSuperTask;
	$scope.delete = Tasks.deleteTask;
	$scope.isSuperTask = Tasks.isSuperTask;
	$scope.save = Tasks.save;

	function countNumCompleted(task) {
		return task.contents.filter(function(subTask) {
			if (!Tasks.isSuperTask(subTask)) {
				return subTask.completed;
			} else {
				return countNumCompleted(subTask) === subTask.contents.length;
			}
		}).length;
	}

	function updateNumCompleted() {
		$scope.completed = countNumCompleted($scope.task);
		if ($scope.completed === $scope.task.contents.length) {
			$scope.task.completed = true;
		} else {
			$scope.task.completed = false;
		}
	}

	updateNumCompleted();

	$scope.$watch('task.contents', function() {
		updateNumCompleted();
	}, true);

	$scope.greenIfAllChildrenComplete = function() {
		if ($scope.isComplete()) {
			return 'green';
		}
		return 'gray';
	};

	$scope.activeIfAllChildrenCompleteOrExpanded = function() {
		if ($scope.isExpanded || $scope.isComplete()){
			return 'active';
		}
		return '';
	};

	$scope.isComplete = function() {
		return $scope.task.completed;
	};
}]);

app.controller('EditTitleController', ['$scope', 'Tasks', function($scope, Tasks) {
	this.editing = false;
	this.endEditing = function() {
		this.editing = false;
		Tasks.save();
	};
	this.startEditing = function() {
		this.editing = true;
	};
}]);

app.controller('LeafTaskController', ['$scope', 'Tasks', function($scope, Tasks) {
	$scope.toggleCompletion = function(task) {
		task.completed = !task.completed;
		Tasks.save();
	};

	$scope.delete = Tasks.deleteTask;
	$scope.save = Tasks.save;
}]);