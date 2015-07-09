"use strict";

var _ = require("lodash");

module.exports = function(app) {
	_.each([
		"./sign-in",
		"./user-info",
		"./favourites"
	], function(controller) {
		require(controller)(app);
	});
};
