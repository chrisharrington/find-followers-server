"use strict";

var Promise = require("bluebird"),

    ExistingFollower = include("data/models").ExistingFollower,

    Logger = include("logger");

module.exports = function(user) {
    var logger = new Logger(user._id);
    return logger.info("Clearing existing followers.").then(function() {
        return new Promise(function(resolve, reject) {
            ExistingFollower.remove({}, function(e) {
                if (e) reject(e);
                else resolve();
            });
        });
    }).then(function() {
        logger.info("Cleared existing followers.");
    });
};
