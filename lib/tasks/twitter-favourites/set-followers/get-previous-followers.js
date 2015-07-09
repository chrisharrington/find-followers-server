"use strict";

var Promise = require("bluebird"),

    ExistingFollower = include("data/models").ExistingFollower;

module.exports = function(user) {
    return new Promise(function(resolve, reject) {
        ExistingFollower.find({ userId: user._id }, function(err, followers) {
            if (err) reject(err);
            else resolve(followers);
        });
    });
}
