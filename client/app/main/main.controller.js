'use strict';

angular.module('passportTestApp')
  .controller('MainCtrl', function ($scope, $state, currUserPromise, $rootScope, $http, Goals, Authentication) {
  	if (!currUserPromise.data) {
  		$state.go('login');
  	} else {
  		$scope.currUser = currUserPromise.data;

	  	$scope.goals = $.parseJSON($scope.currUser.goals);
	  	Goals.setGoals($scope.goals);

	  	if ($scope.goals.length === 0) {
	  		$scope.visibleGoal = undefined;
	  	} else {
				$scope.visibleGoal = $scope.goals[0];
			}

			$scope.logout = function() {
				Authentication.logout(function() {
					$state.go('login');
				},
				function() {
					console.log('Error logging out!');
				});
			};

			$scope.showModal = function() {
				$('.ui.modal').modal('show');
			};
			
			$scope.setVisibleGoal = function(visibleGoal) {
				$scope.visibleGoal = visibleGoal;
			};

			$scope.createNewGoal = function() {
				var newGoal = {name: 'Double-click me to edit title', tasks:[]};
				$scope.visibleGoal = newGoal;
				$scope.goals.push(newGoal);
				Goals.save();
				$scope.setVisibleGoal(newGoal);
			};

			$scope.deleteGoal = function(goalToDelete) {
				if (confirm('Are you sure you want to delete this checklist ('+goalToDelete.name+')?')) {
					var indexOfGoal = $scope.goals.indexOf(goalToDelete);
					$scope.goals.splice(indexOfGoal, 1);
					if (goalToDelete === $scope.visibleGoal) {
						$scope.visibleGoal = $scope.goals[0];
					}
					Goals.save();
				}
			};

			$scope.isComplete = function(goal) {
				if (goal.tasks.length === 0) {
					// Don't say that an empty goal is ever complete (i.e. 0/0)
					return false;
				}

				for (var taskNum = 0; taskNum < goal.tasks.length; taskNum++) {
					if (!goal.tasks[taskNum].completed) {
						return false;
					}
				}
				return true;
			};
  	}

});
