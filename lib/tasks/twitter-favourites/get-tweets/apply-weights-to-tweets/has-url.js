"use strict";

var _ = require("lodash");

module.exports = function(tweet) {
    if (tweet.entities && tweet.entities.urls && tweet.entities.urls.length > 0)
        tweet.weight += 1;
    return tweet;
};