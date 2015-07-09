"use strict";

var _ = require("lodash");

module.exports = function(existingFollowers, currentFollowers) {
    return _.difference(existingFollowers, currentFollowers);
}
