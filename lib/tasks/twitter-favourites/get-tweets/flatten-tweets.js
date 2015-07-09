"use strict";

var _ = require("lodash");

module.exports = function(tweets) {
    return _.flatten(tweets);
};