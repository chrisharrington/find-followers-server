"use strict";

var Promise = require("bluebird"),
	Pipeline = include("pipeline"),
	_ = require("lodash"),

	Logger = include("logger"),

	getTweets = require("./get-tweets"),
	setFavourites = require("./set-favourites"),
	setFollowers = require("./set-followers");

module.exports = {
	go: function(user) {
		var logger = new Logger(user._id);
		return logger.info("Started twitter-favourites task.").then(function() {
			return getTweets(user).then(function(tweets) {
				return logger.info("Tweets retrieved successfully: " + tweets.length).then(function() {
					return setFavourites(user, tweets).then(function() {
						return logger.info("Favourites set.");
					}).then(function() {
						return setFollowers(user, tweets);
					}).then(function() {
						return logger.info("Followers set.");
					}).then(function() {
						return logger.info("Task twitter-favourites complete.");
					});
				});
			});
		});
	}
};
