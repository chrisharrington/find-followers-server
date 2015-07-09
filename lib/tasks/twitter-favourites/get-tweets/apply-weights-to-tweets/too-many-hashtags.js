"use strict";

var _ = require("lodash");

module.exports = function(tweet) {
    if (tweet.entities && tweet.entities.hashtags) {
        var count = tweet.entities.hashtags.length;
        if (count === 4)
            tweet.weight -= 0.5;
        else if (count > 4 && count <= 6)
            tweet.weight -= 1;
        else if (count > 6)
            tweet.weight -= 1.5;
    }

    return tweet;
};
