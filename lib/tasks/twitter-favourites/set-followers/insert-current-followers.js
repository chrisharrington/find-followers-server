"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    ExistingFollower = include("data/models").ExistingFollower,

    Logger = include("logger");

module.exports = function(user, followers) {
    var logger = new Logger(user._id);
    return logger.info("Inserting current followers: " + followers.length).then(function() {
        return Promise.all(_.map(followers, function(follower) {
            return new Promise(function(resolve, reject) {
                new ExistingFollower({
                    userId: user._id,
                    twitterId: follower
                }).save(function(e) {
                    if (e) reject(e);
                    else resolve();
                });
            });
        }));
    }).then(function() {
        return logger.info("Inserted current followers.");
    });
};
