"use strict";

var _ = require("lodash");

module.exports = function(storedFollowers, currentFollowers) {
    return _.difference(currentFollowers, storedFollowers);
}
