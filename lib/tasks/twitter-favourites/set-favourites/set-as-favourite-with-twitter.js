"use strict";

var _ = require("lodash"),
    Twitter = include("apis/twitter");

module.exports = function(user, tweets) {
    var twitter = new Twitter(user.token, user.secret);
	return Promise.all(_.map(tweets, function(tweet) {
        return twitter.favourite(tweet.id_str);
    })).then(function() {
        return tweets;
    });
};
