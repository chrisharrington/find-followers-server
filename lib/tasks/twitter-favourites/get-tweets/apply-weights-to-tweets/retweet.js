"use strict";

module.exports = function(tweet) {
    if (tweet.retweeted_status)
        tweet.weight -= 1;
    return tweet;
};