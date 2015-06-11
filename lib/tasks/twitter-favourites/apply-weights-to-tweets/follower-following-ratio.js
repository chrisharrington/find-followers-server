"use strict";

var _ = require("lodash");

module.exports = function(tweet) {
    var user = tweet.user,
        ratio = user.followers_count / user.friends_count;
    if (ratio <= 1.5)
        tweet.weight += 1;
    else if (ratio <= 2)
        tweet.weight += 0.5;
    else if (ratio <= 3)
        tweet.weight += 0.25;
    return tweet;
};