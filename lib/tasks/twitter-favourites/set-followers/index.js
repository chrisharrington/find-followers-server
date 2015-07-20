"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    Follower = include("data/models").Follower,

    Logger = include("logger");

module.exports = function(user, tweets) {
    // get current followers from twitter
    // get previous followers from mongo
    // take diff between previous and current followers
    // get favourites from mongo
    // find any new followers in favourites
    // save new follower information: userId, twitterId, term

    var logger = new Logger(user._id);
    return Promise.all([
        require("./get-stored-followers")(user),
        require("./get-current-followers")(user),
        require("./get-favourites")(user)
    ]).spread(function(storedFollowers, currentFollowers, favourites) {
        return logger.info("Building and inserting followers.").then(function() {
            return require("./build-followers")(user, storedFollowers, currentFollowers, favourites).then(function(followers) {
                return Promise.all(_.map(followers, function(follower) {
                    return new Promise(function(resolve, reject) {
                        follower.save(function(e) {
                            if (e) reject(e);
                            else resolve();
                        });
                    });
                }));
            });
        }).then(function() {
            return logger.info("Built and inserted followers.");
        }).then(function() {
            return require("./clear-existing-followers")(user);
        }).then(function() {
            return require("./insert-current-followers")(user, currentFollowers);
        });
    });
};
