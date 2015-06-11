"use strict";

var _ = require("lodash"),
    config = include("config");

module.exports = function(tweets) {
    return _.take(tweets, config.favouriteCount);
};