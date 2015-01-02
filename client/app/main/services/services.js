var app = angular.module('services', []);

app.factory('Tasks', function(Goals) {
	var tasks = {};

	tasks.save = Goals.save;
	tasks.isSuperTask = function(task) {
		return task.header != null;
	};
	tasks.addTask = function(parentTaskGroup) {
		parentTaskGroup.push({text: 'New task', completed: false});
		Goals.save();
	};
	tasks.addSuperTask = function(parentTaskGroup) {
		parentTaskGroup.push({header: 'New SuperTask', contents: [{text: 'New subtask', completed: false}]});
		Goals.save();
	};
	tasks.deleteTask = function(parentTaskGroup, taskToDelete) {
		parentTaskGroup.splice(parentTaskGroup.indexOf(taskToDelete), 1);
		Goals.save();
	}
	return tasks;
});

app.factory('Goals', function($http) {
	var wrapper = {};

	wrapper.save = function() {
		$http.post('/api/users/goals', {'newGoals': JSON.stringify(wrapper.goals)})
			.success(function(data) {
				console.log("SAVED");
			})
			.error(function() {
				console.log("ERROR SAVING");
			});
	};

	wrapper.setGoals = function(goals) {
		wrapper.goals = goals;
	};

	return wrapper;
});