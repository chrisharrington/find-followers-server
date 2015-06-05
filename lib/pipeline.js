"use strict";

module.exports = function(tasks) {
	this.go = function(a, b, c, d) {
		if (!tasks || tasks.length === 0)
			return Promise.resolve();

		var promise = tasks[0](a, b, c, d);
		for (var i = 1; i < tasks.length; i++)
			promise = promise.then(tasks[i]);
		return promise;
	}
};