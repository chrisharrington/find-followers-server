"use strict";

var Promise = require("bluebird"),
	Pipeline = include("pipeline");

module.exports = {
	go: function(user, token, secret) {
		return new Pipeline([
			require("./get-tweets"),
			require("./apply-weights-to-tweets"),
			require("./sort-tweets")
		]).go({
			user: user,
			token: token,
			secret: secret
		});
	}
};