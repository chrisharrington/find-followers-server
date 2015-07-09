"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    ExistingFollower = include("data/models").ExistingFollower;

module.exports = function(user, followers) {
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
};
