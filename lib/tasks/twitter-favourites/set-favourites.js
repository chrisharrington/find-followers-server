"use strict";

var _ = require("lodash"),
    twitter = include("apis/twitter/instance");

module.exports = function(tweets) {
	return Promise.all(_.map(tweets, function(tweet) {
        console.log(tweet);
        //console.log(tweet.id + ": " + tweet.text);
        return twitter.get().favourite(tweet.id_str);
    }));
};
