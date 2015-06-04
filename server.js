require("./lib/globals");

var _ = require("lodash"),
	controllers = include("controllers");

var express = require("express"),
	app = express();

controllers(app);

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log("Listening on " + port + "...");
});