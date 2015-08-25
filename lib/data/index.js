"use strict";

var mongoose = require("mongoose"),
	config = include("config"),
	models = include("data/models"),
	Promise = require("bluebird");

module.exports = {
	initialize: function() {
		console.log("blah");
		return new Promise(function(resolve, reject) {
			mongoose.connect(config.mongo);

			var db = mongoose.connection;
			db.on("error", function(err) {
				console.error(err);
				reject(err);
			});
			db.once("open", function () {
				console.log("Data initialized.");
				resolve();
			});
		});
	}
};
