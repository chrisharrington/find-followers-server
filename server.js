"use strict";

require("./lib/globals");

var _ = require("lodash"),
	controllers = include("controllers"),
	config = include("config"),
	data = include("data");

var express = require("express"),
	app = express();

app.use(require("cors")());
controllers(app);

data.initialize();

var server = app.listen(config.server.port, function () {
	var port = server.address().port;
	console.log("Listening on " + port + "...");
});