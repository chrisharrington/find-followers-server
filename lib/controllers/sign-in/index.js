"use strict";

var directory = require("require-dir"),
	_ = require("lodash");

module.exports = function(app) {
	_.each([
		require("./access-token"),
		require("./request-token")
	], function(route) {
		route(app);
	});
};