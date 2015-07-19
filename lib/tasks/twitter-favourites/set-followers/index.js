"use strict";

var Promise = require("bluebird"),
    _ = require("lodash"),

    Follower = include("data/models").Follower;

module.exports = function(user, tweets) {
    // get current followers from twitter
    // get previous followers from mongo
    // take diff between previous and current followers
    // get favourites from mongo
    // find any new followers in favourites
    // save new follower information: userId, twitterId, term

    return Promise.all([
        require("./get-stored-followers")(user),
        require("./get-current-followers")(user),
        require("./get-favourites")(user)
    ]).spread(function(storedFollowers, currentFollowers, favourites) {
        return Promise.all(_.map(require("./build-followers")(storedFollowers, currentFollowers, favourites), function(follower) {
            return new Promise(function(resolve, reject) {
                follower.save(function(e) {
                    if (e) reject(e);
                    else resolve();
                });
            });
        })).then(function() {
            return require("./clear-existing-followers")(user);
        }).then(function() {
            return require("./insert-current-followers")(user, currentFollowers);
        });
    });
};
