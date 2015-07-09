"use strict";

var _ = require("lodash");

module.exports = function(tweet) {
    var friends = tweet.user.friends_count;
    if (friends > 300)
        tweet.weight += 0.25;
    else if (friends > 600)
        tweet.weight += 0.5;
    else if (friends > 1000)
        tweet.weight + 1;
    return tweet;
};
