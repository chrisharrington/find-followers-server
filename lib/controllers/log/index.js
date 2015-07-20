"use strict";

var Promise = require("bluebird"),
	_ = require("lodash"),

	getLogs = require("./get-logs"),
	getUsers = require("./get-users");

module.exports = function(app) {
	app.get("/logs", include("middleware/auth"), _adminOnly, function(req, res) {
        Promise.all([
			getLogs(req.query.skip, req.query.limit),
			getUsers()
		]).spread(function(logs, users) {
			res.send(_applyUsersToLogs(users, logs));
		}).catch(function(e) {
			res.status(500).send(e.stack || e);
		});
	});
};

function _adminOnly(req, res, next) {
    if (req.user.handle === "charrington99")
        next();
    else
        res.sendStatus(401);
}

function _applyUsersToLogs(users, logs) {
	return _.map(logs, function(log) {
		var log = log.toObject();
		log.user = users[log.userId];
		delete log.userId;
		return log;
	});
}
