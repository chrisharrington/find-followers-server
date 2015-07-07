"use strict";

var _ = require("lodash"),
	express = require("express"),

	controllers = include("controllers"),
	config = include("config");

module.exports = {
	go: function() {
		var app = express();

		app.use(require("cors")());
		app.use(include("middleware/user"));
		controllers(app);

		var server = app.listen(config.server.port, function () {
			var port = server.address().port;
			console.log("Listening on " + port + "...");
		});
	}
};
