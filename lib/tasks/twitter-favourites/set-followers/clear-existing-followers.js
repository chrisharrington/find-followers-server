"use strict";

var Promise = require("bluebird"),

    ExistingFollower = include("data/models").ExistingFollower;

module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        ExistingFollower.remove({}, function(e) {
            if (e) reject(e);
            else resolve();
        });
    });
};
