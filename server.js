require("./lib/globals");

var _ = require("lodash"),
	controllers = include("controllers"),
	config = include("config");

var express = require("express"),
	app = express();

controllers(app);

var server = app.listen(config.server.port, function () {
	var port = server.address().port;
	console.log("Listening on " + port + "...");
});