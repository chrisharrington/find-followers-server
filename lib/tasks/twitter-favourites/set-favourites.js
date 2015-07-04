"use strict";

var _ = require("lodash"),
    twitter = include("apis/twitter/instance");

module.exports = function(tweets) {
	return Promise.all(_.map(tweets, function(tweet) {
        return twitter.get().favourite(tweet.id_str);
    })).then(function() {
        return tweets;
    });
};
