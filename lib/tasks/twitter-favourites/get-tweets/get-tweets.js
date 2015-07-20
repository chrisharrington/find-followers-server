"use strict";

var Promise = require("bluebird"),
	Twitter = include("apis/twitter"),
    _ = require("lodash"),

	Logger = include("logger");

module.exports = function(user) {
	var logger = new Logger(user._id);
	var twitter = new Twitter(user.token, user.secret);
    return Promise.all(_.map(user.terms, function(term) {
        return twitter.search(term, user.sinceId).then(function(tweets) {
			return logger.info("Twitter search succeeded: " + tweets.length).then(function() {
				return tweets;
			});
		});
    }));
};
