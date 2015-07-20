"use strict";

var _ = require("lodash"),

    Follower = include("data/models").Follower;

module.exports = function(user, storedFollowers, currentFollowers, favourites) {
    var followers = [];

var diff = require("./diff")(user, storedFollowers, currentFollowers);
debugger;
    return diff.then(function(followers) {
        debugger;
        _.each(followers, function(follower) {
            var favourite = _.find(favourites, function(f) { return f.twitterId === follower; });
            if (favourite)
                followers.push(new Follower(favourite));
        });

        return logger.info("Followers attributed to app: " + followers.length).then(function() {
            return followers;
        });
    });
}
