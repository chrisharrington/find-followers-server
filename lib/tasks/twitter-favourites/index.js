"use strict";

var Promise = require("bluebird");

var tasks = [
	require("./get-tweets"),
	require("./apply-weights-to-tweets"),
	require("./sort-tweets")
];

module.exports = {
	go: function(user) {
		var promise = tasks[0](user);
		for (var i = 1; i < tasks.length; i++)
			promise = promise.then(tasks[i]);
		return promise;
	}
};