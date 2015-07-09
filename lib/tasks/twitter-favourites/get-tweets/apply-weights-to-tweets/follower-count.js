"use strict";

var _ = require("lodash");

module.exports = function(tweet) {
    var followers = tweet.user.followers_count;
    if (followers < 300)
        tweet.weight += 1;
    else if (followers < 600)
        tweet.weight += 0.5;
    else if (followers < 1000)
        tweet.weight + 0.25;
    return tweet;
};