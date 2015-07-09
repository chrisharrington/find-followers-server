"use strict";

var Promise = require("bluebird"),
	Pipeline = include("pipeline"),
	_ = require("lodash"),

	getTweets = require("./get-tweets"),
	setFavourites = require("./set-favourites"),
	setFollowers = require("./set-followers");

module.exports = {
	go: function(user) {
		return getTweets(user).then(function(tweets) {
			return setFavourites(user, tweets).then(function() {
				return setFollowers(user, tweets);
			});
		});
	}
};
