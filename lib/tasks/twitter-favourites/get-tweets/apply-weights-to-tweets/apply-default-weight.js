"use strict";

var Promise = require("bluebird");

module.exports = function(tweet) {
    tweet.weight = 0;
    return tweet;
};
