"use strict";

var _ = require("lodash"),
    Logger = include("logger");

module.exports = function(user, storedFollowers, currentFollowers) {
    var logger = new Logger(user._id),
        diff = _.difference(currentFollowers, storedFollowers);

    return logger.info("Follower diff: " + diff.length).then(function() {
        return diff;
    });
}
