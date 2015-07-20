"use strict";

var _ = require("lodash"),
    Twitter = include("apis/twitter"),
    Promise = require("bluebird"),
    Logger = include("logger");

module.exports = function(user, tweets) {
    var logger = new Logger(user._id);
    var twitter = new Twitter(user.token, user.secret);
    return logger.info("Favouriting tweets with Twitter.").then(function() {
    	return Promise.all(_.map(tweets, function(tweet) {
            return twitter.favourite(tweet.id_str);
        })).then(function() {
            return logger.info("Favouring tweets with Twitter done.");
        }).then(function() {
            return tweets;
        });
    });
};
