"use strict";

module.exports = function(tasks) {
	this.go = function() {
        debugger;
		if (!tasks || tasks.length === 0)
			return Promise.resolve();

		var promise = tasks[0].apply(this, arguments);
        if (!promise.then)
            promise = Promise.resolve(promise);
		for (var i = 1; i < tasks.length; i++)
			promise = promise.then(tasks[i]);
		return promise;
	}
};